import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinsModule } from '../coins/coins.module';
import { UserModule } from '../user/user.module';
import {  ProductModule } from '../product/product.module';
import { LoggerModule } from '../logger/logger.module';



@Module({
  imports: [
    
    UserModule,
    CoinsModule,
    ProductModule,
    LoggerModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule { }