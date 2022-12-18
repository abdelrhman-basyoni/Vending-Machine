import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractService } from "../../abstarcts/abstract.service";
import { Product, ProductDocument } from "../../models/product.model"



@Injectable()
export class ProductService extends AbstractService<ProductDocument> {

    constructor(
        @InjectModel(Product.name) private ProductModel: Model<ProductDocument>
    ){
       super(ProductModel); 
    }


    async createProdcut(req, user){
        return  await this.create({...req,sellerId:user._id})

    }
    
}