import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '../../config/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ({ signedCookies: { access_token } }) => access_token,
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET')
    });
  }

  async validate({ sub: userId, username }: App.JWT.JWTPayload) {
    return { userId, username };
  }
}
