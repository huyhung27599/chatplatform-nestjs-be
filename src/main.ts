import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const { PORT } = process.env;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
