// import { Injectable, Logger } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
// import { I18nContext } from 'nestjs-i18n';








import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractService } from "../../abstarcts/abstract.service";
import { Coins, CoinsDocument } from '../../models/coins.model';



@Injectable()
export class CoinsService extends AbstractService<CoinsDocument> {

    constructor(
        @InjectModel(Coins.name) private coinsModel: Model<CoinsDocument>
    ){
       super(coinsModel); 
    }


    async createCoins(req, user){
        return  await this.create({...req,sellerId:user._id})

    }
    
}










// @Injectable()
// export class CoinsService {
//     private readonly log = new Logger(CoinsService.name);
//     constructor(@InjectModel(Coins.name) private CoinsModel: Model<CoinsDocument>) { }

//     async create(req, user){
//         const   res  = await this.CoinsModel.create({...req,sellerId:user._id}) ;
//         return res
//     }



//     async findAll(page:number, pageSize:number,i18n: I18nContext){
//         const [total,Coinss] =  await Promise.all([
//             this.count(),
//             this.findMany({},{},{skip:((page-1) +pageSize),limit:pageSize}) 

//         ]);


//         return {
//             success: true,
//             message: i18n.t('messages.success'),
//             data:{
//                 total,
//                 Coinss
//             }
//         }

//     }

//     /** basic services */
//     async findByIdAndUpdate(id: string, req: Partial<Coins>, options?: QueryOptions) {

//         return await this.CoinsModel.findByIdAndUpdate(id, req, { new: true, ...options })

//     }
//     async findOneAndUpdate(filter: any, req: Partial<Coins>, options?: QueryOptions) {

//         return await this.CoinsModel.findByIdAndUpdate(filter, req, { new: true, upsert:true,...options })

//     }
//     async update(  update: UpdateQuery<CoinsDocument>, options?: QueryOptions) {

//         return await this.CoinsModel.findOneAndUpdate({}, update, { new: true, upsert:true,...options })

//     }

//     async findOneById(id: string, projection?: ProjectionType<CoinsDocument>, options?: QueryOptions) {
//         return this.CoinsModel.findById(id, projection, options);
//     }

//     async findOne(filter: any, projection?: ProjectionType<CoinsDocument>, options?: QueryOptions) {
//         return this.CoinsModel.findOne(filter, projection, options);
//     }

//     async findMany(filter?: any, projection?: ProjectionType<CoinsDocument>, options?: QueryOptions<CoinsDocument>) {

//         return this.CoinsModel.find(filter, projection, options);
//     }

//     async findByIdAndDelete(id: string) {
//         return await this.CoinsModel.findByIdAndDelete(id);
//     }
//     async findOneAndDelete(filter: any) {
//         return await this.CoinsModel.findOneAndDelete(filter);
//     }

//     async remove(filter: any) {
//         return await this.CoinsModel.remove(filter);
//     }
//     async count(filter?: any) {
//         return await this.CoinsModel.count(filter);
//     }

// }