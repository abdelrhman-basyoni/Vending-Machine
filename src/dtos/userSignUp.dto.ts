import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty} from 'class-validator';
import { UserRoles } from "../enums/userRoles.enum";
export class  UserSignUpDto {

    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty({description:"user role",enum:[UserRoles.buyer,UserRoles.seller]})
    @IsNotEmpty()
    role: UserRoles;

}