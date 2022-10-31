
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { UserRoles } from '../enums/userRoles.enum';
import { BaseEntity } from './baseEntity.model';
import * as bcrypt from 'bcrypt';
export type UserDocument = User & Document;

@Schema({
  autoIndex: true,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class User extends BaseEntity {
  @Prop({ unique: true })
  @ApiProperty()
  userName: string;

  @ApiProperty()
  @Prop({ select: false })
  password: string;


  @Prop({ default: 0 })
  deposite: number;

  @ApiProperty()
  @Prop({
    enum: UserRoles,
    type: String,
    default: UserRoles.buyer
  })
  role: UserRoles;



  async checkPassword(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
  };
}



export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);