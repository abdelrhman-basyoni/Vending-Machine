import * as bcrypt from 'bcrypt';

export function isNumber(value: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
}

export async function   hashPassword (password : string){
    const salt = await bcrypt.genSalt(10);
    const  hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}