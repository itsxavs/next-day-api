import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/NEXT_DAY_DB'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
