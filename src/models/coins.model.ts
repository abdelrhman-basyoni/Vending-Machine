import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { BaseEntity } from './baseEntity.model';


export type CoinsDocument = Coins & Document;

@Schema({
    autoIndex: true,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class Coins extends BaseEntity {
    @ApiProperty({})
    @Prop({default:0})
    5: number;

    @ApiProperty({})
    @Prop({default:0})
    10: number;

    @ApiProperty({})
    @Prop({default:0})
    20: number;

    @ApiProperty({})
    @Prop({default:0})
    50: number;

    @ApiProperty({})
    @Prop({default:0})
    100: number;



 


}



export const CoinsSchema = SchemaFactory.createForClass(Coins);