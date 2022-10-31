import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { I18nModule ,AcceptLanguageResolver, QueryResolver} from 'nestjs-i18n';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { CoinsModule } from './modules/coins/coins.module';
import { TransactionModule } from './modules/transactions/transaction.module';
const appModules = [
  UserModule,
  ProductModule,
  CoinsModule,
  TransactionModule
]
@Module({
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }), 

    MongooseModule.forRoot(
      process.env.DB_URL,
      {
        dbName: process.env.DB_NAME,
 

        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('DB is connected');
          });
          connection.on('disconnected', () => {
            console.log('DB disconnected');
          });
          connection.on('error', (error) => {
            console.log('DB connection failed! for error: ', error);
          });
          return connection;
        },
      },
    ),
    ...appModules
  ],
  controllers: [AppController],
  providers: [AppService],



})
export class AppModule {}
