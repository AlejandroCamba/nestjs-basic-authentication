import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string
  ): Promise<UnauthorizedException | Partial<import('../../models/user/user.entity').User>> {
    return await this.authService.validateUser(username, password);
  }
}
