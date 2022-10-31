import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, Req, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { BuyDto } from '../../dtos/buy.dto';
import { DepositeDto } from '../../dtos/deposite.dto';
import { ResponseDto } from '../../dtos/response.dtp';
import { UserRoles } from '../../enums/userRoles.enum';
import { Role } from '../../guards/roles.decorator';


import { TransactionService } from './transaction.service';



@ApiTags('Transaction')
@Controller('Transaction')
export class TransactionController {

    constructor(private service: TransactionService) { }
    @ApiBearerAuth()
    @Role([UserRoles.buyer])
    @Post('/deposite')
    async deposite(@Body() body :DepositeDto ,@Req() req:any, @I18n() i18n: I18nContext): Promise<ResponseDto>{
        return this.service.deposite(body, req.user,i18n)

    }
    @ApiBearerAuth()
    @Role([UserRoles.buyer])
    @Post('/buy')
    async buy(@Body() body : BuyDto, @Req() req:any, @I18n() i18n: I18nContext) : Promise<ResponseDto>{
        return this.service.buy(body, req.user,i18n)
    }
    @ApiBearerAuth()
    @Role([UserRoles.buyer])
    @Get('/checkout')
    async checkOut(@Req() req:any, @I18n() i18n: I18nContext): Promise<ResponseDto>{
        return this.service.checkOut(req.user,i18n)
    }


    /* End of Transaction Controller Class 
   */
}