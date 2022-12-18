
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { hashPassword } from '../../shared/utils';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractService } from "../../abstarcts/abstract.service";
import { User, UserDocument } from '../../models/user.model';
import { I18nContext } from 'nestjs-i18n';
import { LoginDto } from '../../dtos/login.dto';
import { TokenDto } from '../../dtos/token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService extends AbstractService<UserDocument> {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ){
       super(userModel); 
    }

        async createUser(user: User) {
        /**  before creating user run hash password */
        user.password = await hashPassword(user.password);
        let res = await this.create(user);
        /** to avoid returning the password */
        res = res.toObject()
        delete res?.password;
        return res
    }


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



    
}


