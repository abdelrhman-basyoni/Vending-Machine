import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, Query, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { LoginDto } from '../../dtos/login.dto';
import { ResponseDto } from '../../dtos/response.dtp';
import { UserSignUpDto } from '../../dtos/userSignUp.dto';
import { Role } from '../../guards/roles.decorator';
import { User } from '../../models/user.model';

import { UserService } from './user.service';



@ApiTags('User')
@Controller('User')
export class UserController {

    constructor(private service: UserService) { }
    /* POST User End Point */


    @Post('/signUp')
    async signUp(@Body() body: UserSignUpDto, @I18n() i18n: I18nContext): Promise<ResponseDto> {
        const res = await this.service.create(body as User )
        return {
            success: true,
            message: i18n.t('messages.success'),
            data:{
                user :res
            }

        }

    }
    @Post('/login')
    async logiIn(@Body() body: LoginDto, @I18n() i18n: I18nContext): Promise<ResponseDto>{

        return this.service.login(body,i18n)
        
    }

    @Get('/rest')
    async restBalance(@Req() req:any, @I18n() i18n: I18nContext): Promise<ResponseDto>{

        return this.service.restBalance(req.user._id,i18n)
        
    }



    /* GET All  End Point */
    @ApiBearerAuth()
    @Get('/getAll')
    getAll( @Query('pagesize') pageSize: number,@Query('page') page: number,@I18n() i18n: I18nContext) {
        return this.service.findAll(page || 1, pageSize || 20,i18n);
    }



    /* GET One User End Point */
    @ApiBearerAuth()
    @Get('/findOne/:id')
    async findOne(@Param('id') id: string,@I18n() i18n: I18nContext): Promise<ResponseDto> {
        const user = await  this.service.findOne(id);
        return {
            success: user ? true : false,
            message: user ? i18n.t('messages.success') : i18n.t('errors.notfound'),
            data:{
                user: user
            }
        }
    }



    /* PUT  User End Point */
    @ApiBearerAuth()

    @Put('/updateOne:id')
    async updateOne(@Param('id') id: string, @Body() req: User ,@I18n() i18n: I18nContext) {
        const user = await  this.service.findByIdAndUpdate(id, req);
        return {
            success: user ? true : false,
            message: user ? i18n.t('messages.success') : i18n.t('errors.notfound'),
            data:{
                user: user
            }
        }
    }



    /* Delete  User End Point */
    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Delete('/deleteOne/:id')
    async deleteOne(@Param('id') id: string,@I18n() i18n: I18nContext) {
        const user = await this.service.findByIdAndDelete(id)
        return {
            success: user ? true : false,
            message: user ? i18n.t('messages.success') : i18n.t('errors.notfound'),
            data:{
                user: user
            }
        }
    }
    /* End of User Controller Class 
   */
}