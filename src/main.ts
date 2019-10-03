import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import ConfigService from './config/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(ConfigService.get('SECRET')));

  const corsOptions: import('@nestjs/common/interfaces/external/cors-options.interface').CorsOptions = {
    credentials: true,
    origin: 'http://localhost:4200',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type'
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
