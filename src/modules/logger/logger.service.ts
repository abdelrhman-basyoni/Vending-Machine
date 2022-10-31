import { Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, UpdateQuery } from 'mongoose';
import { TokenDto } from '../../dtos/token.dto';
import { Log, LogDocument } from '../../models/log.model';

// // @Injectable()
// export class  {

// }

export class MongoDbLoggerService {

    constructor(
        @InjectModel(Log.name) private LogModel: Model<LogDocument>) { }

        
    async findOneAndUpdate(filter: any, update: UpdateQuery<LogDocument>, options?: QueryOptions<LogDocument>) {


        return await this.LogModel.findOneAndUpdate(filter, update, { new: true, ...options })

    }
    async create(log:any){
        return await this.LogModel.create(log)
    }

    async createLog(uuid: string, user: TokenDto, operation: string, logData: any) {


        await this.create({ uuid: uuid , records: logData,operation:operation, user:user  })


    }


    async log(uuid: string, logData: any) {


        await this.findOneAndUpdate({ uuid: uuid }, { $push: { records: logData } })


    }



}