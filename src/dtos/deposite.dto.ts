import { ApiProperty } from '@nestjs/swagger'
import {IsIn} from 'class-validator'
export class DepositeDto {
    @ApiProperty()
    @IsIn([5,10,20,50,100])
    amount :number
}