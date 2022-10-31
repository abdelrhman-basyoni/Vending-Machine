import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { TokenDto } from '../dtos/token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
      algorithm: "HS256"
    });
  }

  async validate(payload: any) {
    let tokenPayload: TokenDto
    tokenPayload = {
      _id: payload._id,
      userName: payload.userName,
      role: payload.role
    }

    return tokenPayload;
  }
}
