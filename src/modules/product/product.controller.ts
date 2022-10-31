import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, Req, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ResponseDto } from '../../dtos/response.dtp';
import { UserRoles } from '../../enums/userRoles.enum';
import { Role } from '../../guards/roles.decorator';
import { Product } from '../../models/product.model';

import { ProductService } from './product.service';



@ApiTags('Product')
@Controller('Product')
export class ProductController {

    constructor(private service: ProductService) { }
    /* POST Product End Point */
    @ApiBearerAuth()
    @Role([UserRoles.seller])
    @Post('/create')
    async create(@Body() body: Product,@Req() req: any, @I18n() i18n: I18nContext): Promise<ResponseDto> {
        const res = await this.service.create(body,req.user)
        return {
            success:true,
            message:i18n.t('messages.success'),
            data:{
                product:res
            }
        }

    }



    /* GET All  End Point */


    @Get('/getAll')
    getAll( @Query('pagesize') pageSize: number,@Query('page') page: number,@I18n() i18n: I18nContext) {
        return this.service.findAll(page || 1, pageSize || 20,i18n);
    }



    /* GET One Product End Point */
 

    @Get('findOne/:id')
    async findOne(@Param('id') id: string,@I18n() i18n: I18nContext):Promise<ResponseDto> {
        const product = await  this.service.findOne(id);
        return {
            success: product ? true : false,
            message: product ? i18n.t('messages.success') : i18n.t('errors.notfound'),
            data:{
                product: product
            }
        }
    }



    /* PUT  Product End Point */
    @ApiBearerAuth()
    @Role([UserRoles.seller])
    @Put('updateOne/:id')
    async update(@Param('id') id: string, @Body() body: Partial<Product> , @Req() req :any,@I18n() i18n: I18nContext) {
        const product = await  this.service.findOneAndUpdate({_id: id,sellerId:req.user._id}, body);
        return {
            success: product ? true : false,
            message: product ? i18n.t('messages.success') : i18n.t('errors.notfound'),
            data:{
                product: product
            }
        }
    }



    /* Delete  Product End Point */
    @ApiBearerAuth()
    @Role([UserRoles.seller])
    @Delete('deleteOne/:id')
    async delete(@Param('id') id: string, @Req() req :any,@I18n() i18n: I18nContext) {
        const product = await this.service.findOneAndDelete({_id:id, sellerId:req.user._id})
        return {
            success: product ? true : false,
            message: product ? i18n.t('messages.success') : i18n.t('errors.notfound'),
            data:{
                product: product
            }
        }
    }
    /* End of Product Controller Class 
   */
}