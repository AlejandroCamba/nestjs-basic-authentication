import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import configService from './config/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
      host: configService.get('TYPEORM_HOST'),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
      entities: [configService.get('TYPEORM_ENTITIES')],
    }),
    AuthModule,
    UsersModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
