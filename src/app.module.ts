import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DetailsStudentModel } from './models/detailsStudent.model';
import { PostModule } from './features/post/post.module';
import { StudentModule } from './features/student/student.module';
import { TeacherModule } from './features/teacher/teacher.module';
import { ChatGateway } from './features/chat-gate-way/chat.gateway';
import { ChatGateWayModule } from './features/chat-gate-way/chat-gate-way.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.develop.env`,
      // envFilePath: `.develop.env`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    DetailsStudentModel,
    PostModule,
    StudentModule,
    TeacherModule,
    ChatGateWayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
