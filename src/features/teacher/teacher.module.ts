import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from 'src/models/teacher.models';
import { Model } from 'mongoose';
import { TeacherController } from './teacher.controller';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [StudentModule],
  providers: [
    TeacherService,
    { provide: 'TeacherModel', useValue: Model<Teacher> },
  ],
  exports: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
