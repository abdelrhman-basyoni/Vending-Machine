import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { TokenDto } from '../dtos/token.dto';
import { BaseEntity } from './baseEntity.model';



export type LogDocument = Log & Document;

@Schema({
    autoIndex: true,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class Log extends BaseEntity {
  
    @Prop({})
    uuid: string;
    
    @Prop({})
    operation : string

    @Prop({ type: () => TokenDto})
    user: TokenDto;

    @Prop({})
    records:[]



}



export const LogSchema = SchemaFactory.createForClass(Log);