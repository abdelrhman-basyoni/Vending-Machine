import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ProjectionType, QueryOptions } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';
import { BuyDto } from '../../dtos/buy.dto';
import { DepositeDto } from '../../dtos/deposite.dto';
import { TokenDto } from '../../dtos/token.dto';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { Coins } from '../../models/coins.model';
import { CoinsService } from '../coins/coins.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { MongoDbLoggerService } from '../logger/logger.service';
import * as crypto from 'crypto'
@Injectable()
export class TransactionService {
    private readonly log = new Logger(TransactionService.name);
    constructor(
        @InjectConnection() private readonly connection: mongoose.Connection,
        private coinsService: CoinsService,
        private userService: UserService,
        private productService: ProductService,
        private mongoLogger: MongoDbLoggerService

    ) { }

    async deposite(body: DepositeDto, user: TokenDto, i18n: I18nContext) {
        /** user with byer role can deposite 5 ...,100 coins in his account */
        const uuid = crypto.randomUUID()
        await this.mongoLogger.createLog(uuid, user, 'deposite', body);

        const session = await this.connection.startSession();
        let userDb: User;
        let coins: Coins;
        await session.withTransaction(async () => {
            const coin = body.amount;
            const update = {};
            update[coin] = coin

            userDb = await this.userService.findByIdAndUpdate(user._id, { $inc: { deposite: body.amount } }, { session: session });
            coins = await this.coinsService.update({ $inc: update }, { session: session });

            if (!userDb || !coins) {
                throw new BadRequestException(i18n.t('errors.invalid'));
                this.mongoLogger.log(uuid,{data:" transaction failed"})

            }



        });
        await session.endSession();

        return {
            success: true,
            message: i18n.t('messages.success'),
            data: {
                balance: userDb.deposite,

            }
        }

    }


    async buy(body: BuyDto, tokenUser: TokenDto, i18n: I18nContext) {
        /** check if product exist and has amount more than the requeted amount (task requirements says single product id)
         * if valid product start db transaction and minus the the product amount and the user balance 
         * return to user product data and how much did he purchased and for how much money and his remaining balance 
         * log
         */
        const uuid = crypto.randomUUID()
        await this.mongoLogger.createLog(uuid, tokenUser, 'buy', body);
        let totalCost = 0;
        let product: Product;
        let user: User;
        const session = await this.connection.startSession();
        await session.withTransaction(async () => {
            product = await this.productService.findOneAndUpdate(
                { _id: body.productId, amountAvailable: { $gte: body.amount } },
                { $inc: { amountAvailable: -body.amount } },
                { session: session });

            if (!product) {
                throw new BadRequestException(i18n.t('errors.invalidProduct'));
                this.mongoLogger.log(uuid,{error:" transaction failed invalid product"})
            }
            totalCost = product.cost * body.amount;
            this.mongoLogger.log(uuid,{data:product})
            user = await this.userService.findOneAndUpdate(
                { _id: tokenUser._id, deposite: { $gte: totalCost } },
                { $inc: { deposite: -totalCost } },
                { session: session }
            )
            if (!user) {
                throw new BadRequestException(i18n.t('errors.notenoughMoney'));
                this.mongoLogger.log(uuid,{error:" transaction failed not enough money in user acount"})
            }
            this.mongoLogger.log(uuid,{data:user})
        });
        await session.endSession();

        return {
            success: true,
            message: i18n.t('messages.success'),
            data: {
                product,
                totalCost,
                remaningBalance: user.deposite,

            }
        }

    }

    getChanges(wallet: number) {
        /** transform the wallet into the different coins we have */
        const coins = [100, 50, 20, 10, 5]
        const change = {
            5: 0,
            10: 0,
            20: 0,
            50: 0,
            100: 0,
            remaining: wallet

        }

        coins.forEach(coin => {
            if (change.remaining >= coin) {
                let count = Math.trunc(change.remaining / coin);
                let remaining = change.remaining % coin;
                change[coin] += count;
                change.remaining = remaining;
            }
        })

        return change;

    }


    async checkOut(tokenUser: TokenDto, i18n: I18nContext) {
        /** if use wants to check out we return his money back in coins 5 ,..,100 
         * and if there is change less then 5 we leave it
         */

         const uuid = crypto.randomUUID()
         await this.mongoLogger.createLog(uuid, tokenUser, 'checkout', {checkout:"user requested a checkout"});
        const coins = [100, 50, 20, 10, 5]

        const dbUser = await this.userService.findOneById(tokenUser._id);
        const change = this.getChanges(dbUser.deposite);


        const session = await this.connection.startSession();
        await session.withTransaction(async () => {
            /** set user deposite as change. remaning
             * minus the coins with the values from change
             */
            await this.userService.findByIdAndUpdate(tokenUser._id,
                {
                    deposite: change.remaining
                }, { session: session });

            await this.coinsService.update({
                $inc: {
                    5: -change[5],
                    10: -change[10],
                    20: -change[20],
                    50: -change[50],
                    100: -change[100],
                }
            },
                { session: session }
            )

        });
        await session.endSession();

        return {
            success: true,
            message: i18n.t('messages.success'),
            data: {
                ...change
            }
        }

    }




}