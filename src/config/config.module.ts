import { Module } from '@nestjs/common';
import configService, { ConfigService } from './config/config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: configService
    }
  ],
  exports: [ConfigService]
})
export class ConfigModule {}
