import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../models/user/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async userExists(username: string): Promise<boolean> {
    return await !!this.usersService.findUser(username);
  }

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findUser(username);
    const bcrypt = require('bcrypt');

    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    } else if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const { password: excludedProp, ...result } = user;
    return result;
  }

  async login(user: User): Promise<App.Auth.LoginResponse> {
    const payload: App.JWT.JWTPayload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }
}
