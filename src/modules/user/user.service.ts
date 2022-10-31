import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { User, UserDocument } from '../../models/user.model';
import { hashPassword } from '../../shared/utils';
import { I18nContext } from 'nestjs-i18n';
import { LoginDto } from '../../dtos/login.dto';
import { TokenDto } from '../../dtos/token.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    private readonly log = new Logger(UserService.name);
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        private jwtService: JwtService,

    ) { }

    async login(body: LoginDto, i18n: I18nContext) {
        const user = await this.findOne({ userName: body.userName }, { password: 1, userName: 1, role: 1 })
        if (!user) {
            throw new UnauthorizedException('invalid user');
        }

        if (!await user.checkPassword(body.password)) {
            throw new UnauthorizedException('invalid user');
        }
        const payload: TokenDto = {
            _id: user._id,
            userName: user.userName,
            role: user.role

        }
        user.password = undefined; // remove the password
        return {
            success: true,
            message: i18n.t('messages.success'),
            data: {
                user: user, token: this.jwtService.sign(payload)
            }
        }

    }

    async findAll(page: number, pageSize: number, i18n: I18nContext) {
        const [total, users] = await Promise.all([
            this.count(),
            this.findMany({}, {}, { skip: ((page - 1) + pageSize), limit: pageSize })

        ]);


        return {
            success: true,
            message: i18n.t('messages.success'),
            data: {
                total,
                users
            }
        }

    }



    async restBalance( id, i18n:I18nContext){
        const user = await this.findByIdAndUpdate(id,{deposite:0})
        if (!user){
            throw new BadRequestException(i18n.t('errors.invalid'));
        }

        return {
            success:true,
            message:i18n.t('messages.success')
        }
    }



    /** basic services */

    async create(user: User) {
        /**  before creating user run hash password */
        user.password = await hashPassword(user.password);
        let res = await this.UserModel.create(user);
        /** to avoid returning the password */
        res = res.toObject()
        delete res?.password;
        return res
    }


    async findByIdAndUpdate(id: string, update: UpdateQuery<UserDocument>, options?: QueryOptions<UserDocument>) {
        /** to prevent any  unwanted password update  */
        delete update?.password;
        return await this.UserModel.findByIdAndUpdate(id, update, { new: true, ...options })

    }
    async findOneAndUpdate(filter: any, update: UpdateQuery<UserDocument>, options?: QueryOptions<UserDocument>) {
        /** to prevent any  unwanted password update  */
        delete update?.password;
        return await this.UserModel.findOneAndUpdate(filter, update, { new: true, ...options })

    }

    async findOneById(id: string, projection?: ProjectionType<UserDocument>, options?: QueryOptions<UserDocument>) {
        return this.UserModel.findById(id, projection, options);
    }

    async findOne(filter: any, projection?: ProjectionType<UserDocument>, options?: QueryOptions<UserDocument>) {
        return this.UserModel.findOne(filter, projection, options);
    }

    async findMany(filter?: any, projection?: ProjectionType<UserDocument>, options?: QueryOptions<UserDocument>) {

        return this.UserModel.find(filter, projection, options);
    }


    async findByIdAndDelete(id: string) {
        return await this.UserModel.findByIdAndDelete(id);
    }
    async count(filter?: any) {
        return await this.UserModel.count(filter);
    }



}