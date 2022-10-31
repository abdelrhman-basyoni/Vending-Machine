import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../models/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../guards/jwt.strategy';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: async () => {
                    const schema = UserSchema;
                    return schema;
                },
            },
        ]),
        PassportModule,
        JwtModule.register({
          secret: process.env.TOKEN_SECRET,
          signOptions: { algorithm: 'HS256' /**expiresIn: '60000s'*/ },
        }),
    ],
    controllers: [UserController],
    providers: [UserService,JwtStrategy],
    exports: [UserService,JwtStrategy]
})
export class UserModule { }