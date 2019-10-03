import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import configService, { ConfigService } from '../../config/config/config.service';
import { UsersModule } from '../../modules/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '2h' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: ConfigService,
      useValue: configService
    }
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
