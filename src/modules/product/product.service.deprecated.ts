import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';
import { Product, ProductDocument } from '../../models/product.model';
@Injectable()
export class ProductService {
    private readonly log = new Logger(ProductService.name);
    constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

    async create(req, user){
        const   res  = await this.ProductModel.create({...req,sellerId:user._id}) ;
        return res
    }



    async findAll(page:number, pageSize:number,i18n: I18nContext){
        const [total,products] =  await Promise.all([
            this.count(),
            this.findMany({},{},{skip:((page-1) +pageSize),limit:pageSize}) 

        ]);


        return {
            success: true,
            message: i18n.t('messages.success'),
            data:{
                total,
                products
            }
        }

    }

    /** basic services */
    async findByIdAndUpdate(id: string, update: UpdateQuery<ProductDocument>, options?: QueryOptions<ProductDocument>) {

        return await this.ProductModel.findByIdAndUpdate(id, update, { new: true, ...options })

    }
    async findOneAndUpdate(filter: any, update: UpdateQuery<ProductDocument>, options?: QueryOptions<ProductDocument>) {
        

        return await this.ProductModel.findOneAndUpdate(filter, update, {new: true, ...options})

    }

    async findOneById(id: string, projection?: ProjectionType<ProductDocument>, options?: QueryOptions<ProductDocument>) {
        return this.ProductModel.findById(id, projection, options);
    }

    async findOne(filter: any, projection?: ProjectionType<ProductDocument>, options?: QueryOptions<ProductDocument>) {
        return this.ProductModel.findOne(filter, projection, options);
    }

    async findMany(filter?: any, projection?: ProjectionType<ProductDocument>, options?: QueryOptions<ProductDocument>) {

        return this.ProductModel.find(filter, projection, options);
    }

    async findByIdAndDelete(id: string) {
        return await this.ProductModel.findByIdAndDelete(id);
    }
    async findOneAndDelete(filter: any) {
        return await this.ProductModel.findOneAndDelete(filter);
    }

    async remove(filter: any) {
        return await this.ProductModel.remove(filter);
    }
    async count(filter?: any) {
        return await this.ProductModel.count(filter);
    }

}