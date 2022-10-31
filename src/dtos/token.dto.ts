import { UserRoles } from "../enums/userRoles.enum";

export class TokenDto {
    _id: string;

    userName:string

    role:UserRoles
}