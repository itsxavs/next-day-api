import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //En un futuro puedo limitar quien consume mi backend pero por ahora que me roben toda mi informacion db
  app.enableCors();
  mongoose
    .connect(
      process.env.MONGODB_URI ||
        'mongodb+srv://javier01:javier01@cluster1.xx0vfno.mongodb.net/next-day-app?retryWrites=true&w=majority&appName=Cluster1',
    )
    .then(() => console.log('Connected to MongoDB'));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API endpoints for your application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
