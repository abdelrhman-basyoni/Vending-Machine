import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from '../../models/log.model';
import { MongoDbLoggerService } from './logger.service';


@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Log.name,//class name
                useFactory: async () => {
                    const schema = LogSchema;

                    return schema;
                },
            }
        ])
    ],
    providers: [MongoDbLoggerService],
    controllers: [],
    exports: [MongoDbLoggerService],
})
export class LoggerModule { }