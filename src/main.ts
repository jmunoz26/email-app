import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allow these methods
    allowedHeaders: 'Content-Type, Accept', // allow these headers
  });
  await app.listen(3001);
}
bootstrap();
