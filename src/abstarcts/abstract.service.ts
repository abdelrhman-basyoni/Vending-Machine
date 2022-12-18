import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';


@Injectable()
export abstract class AbstractService < modelDocument> {
    // private readonly log = new Logger(ProductService.name);
    constructor(
        public model: Model<any>,
        ) { }

    async create(req){
        const   res  = await this.model.create(req) ;
        return res
    }



    async findAll(page:number, pageSize:number,i18n: I18nContext){
        const [total,products] =  await Promise.all([
            this.count(),
            this.findMany({},{},{skip:((page-1) *pageSize),limit:pageSize}) 

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
    async findByIdAndUpdate(id: string, update: UpdateQuery<modelDocument>, options?: QueryOptions<modelDocument>) {

        return await this.model.findByIdAndUpdate(id, update, { new: true, ...options })

    }
    async findOneAndUpdate(filter: any, update: UpdateQuery<modelDocument>, options?: QueryOptions<modelDocument>) {
        

        return await this.model.findOneAndUpdate(filter, update, {new: true, ...options})

    }

    async findOneById(id: string, projection?: ProjectionType<modelDocument>, options?: QueryOptions<modelDocument>) {
        return this.model.findById(id, projection, options);
    }

    async findOne(filter: any, projection?: ProjectionType<modelDocument>, options?: QueryOptions<modelDocument>) {
        return this.model.findOne(filter, projection, options);
    }

    async findMany(filter?: any, projection?: ProjectionType<modelDocument>, options?: QueryOptions<modelDocument>) {

        return this.model.find(filter, projection, options);
    }

    async findByIdAndDelete(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
    async findOneAndDelete(filter: any) {
        return await this.model.findOneAndDelete(filter);
    }

    async remove(filter: any) {
        return await this.model.remove(filter);
    }
    async count(filter?: any) {
        return await this.model.count(filter);
    }

}