import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';
import os from 'os';
import path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  configService.setEnvFilePaths([`.${process.env.NODE_ENV}.env`]);
  //En un futuro puedo limitar quien consume mi backend pero por ahora que me roben toda mi informacion db
  app.enableCors();
  mongoose
    .connect(configService.get<string>('MONGODB_URI'))
    .then((q) => {
      console.log(`Connected to MongoDB ${q.toString()}`);
    })
    .catch((err) => {
      console.log(`Error connecting to MongoDB ${err.toString()}`);
    });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API endpoints for your application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useWebSocketAdapter(new IoAdapter(app));
  console.log(configService.get<number>('PORT'));
  console.log(`.${process.env.NODE_ENV}.env`);
  await app
    .listen(configService.get<number>('PORT'))
    .then((q) => {
      console.log(`'Server is running ' ${q.toString()}`);
    })
    .catch((err) => {
      console.log(`Error starting server ${err.toString()}`);
    });
}
bootstrap();
