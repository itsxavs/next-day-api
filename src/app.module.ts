import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DetailsStudentModel } from './models/detailsStudent.model';
import { PostModule } from './features/post/post.module';
import { StudentModule } from './features/student/student.module';
import { TeacherModule } from './features/teacher/teacher.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/next-day-db'),
    AuthModule,
    DetailsStudentModel,
    PostModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
