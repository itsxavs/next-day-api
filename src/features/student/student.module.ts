import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { DetailsUserModule } from '../details-user/details-user.module';
import { Model } from 'mongoose';
import { Student } from 'src/models/student.model';
import { StudentController } from './student.controller';

@Module({
  imports: [DetailsUserModule],
  providers: [
    StudentService,
    { provide: 'StudentModel', useValue: Model<Student> },
  ],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
