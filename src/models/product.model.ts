import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { BaseEntity } from './baseEntity.model';
import { User } from './user.model';

export type ProductDocument = Product & Document;

@Schema({
    autoIndex: true,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class Product extends BaseEntity {
    @ApiProperty({})
    @Prop({})
    productName: string;

    @ApiProperty({})
    @Prop({min:0})
    amountAvailable: number;

    @ApiProperty({})
    @Prop({})
    cost: number;

 
    @Prop({ type: Types.ObjectId, ref: User.name })
    sellerId: User;

}



export const ProductSchema = SchemaFactory.createForClass(Product);