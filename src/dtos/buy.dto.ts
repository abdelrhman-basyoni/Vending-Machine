import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,Min,IsInt } from 'class-validator'
export class BuyDto {
    @ApiProperty()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    amount: number;
}