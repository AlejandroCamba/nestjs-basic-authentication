import { Controller, Req, Post, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '../../../config/config/config.service';
import { User } from '../../../models/user/user.entity';

@Controller('auth')
export class AuthController {
  private _tokenName: string;

  constructor(private authService: AuthService, private configService: ConfigService) {
    this._tokenName = this.configService.get('TOKEN_NAME');
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request & { user: User & App.Auth.Request }, @Res() res: Response) {
    const result = await this.authService.login(req.user);

    res.cookie(this._tokenName, result.access_token, {
      path: '/',
      httpOnly: false,
      signed: true,
      secure: false,
      domain: 'localhost',
      maxAge: 7200000
    });

    res.status(200).send({
      user: result.user
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Res() res) {
    res
      .status(204)
      .clearCookie(this._tokenName)
      .send();
  }
}
