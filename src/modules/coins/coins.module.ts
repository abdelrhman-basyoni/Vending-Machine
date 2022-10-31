import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coins, CoinsSchema } from '../../models/coins.model';


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Coins.name,
        useFactory: async () => {
          const schema = CoinsSchema;

          return schema;
        },
      },
    ]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
  exports:[CoinsService]
})
export class CoinsModule { }