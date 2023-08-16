import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 'loopback');

  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
      console.log(`Running in ${process.env.ENVIRONMENT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
