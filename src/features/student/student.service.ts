import { AuthService } from './../../auth/auth.service';
import { User } from 'src/models/user.model';
import { Student, StudentModel } from './../../models/student.model';
import { Injectable } from '@nestjs/common';
import { Classroom } from 'src/models/interface/classroom.interface';
import { DetailsUserService } from '../details-user/details-user.service';
import { Ref } from '@typegoose/typegoose';

@Injectable()
export class StudentService {
  constructor(private detailsStudentService: DetailsUserService) {}

  async create(user: User) {
    const details = await this.detailsStudentService.create();
    const newStudent = new StudentModel({ user, details });
    await newStudent.save();
  }

  async findOne(userId: string) {
    const foundStudent = await StudentModel.findById(userId);
    const details = await this.detailsStudentService.getDetailsStudent(
      foundStudent.details,
    );
    foundStudent.details = details;
    return foundStudent;
  }

  async findSomeStudents(studentsId: Ref<Student>[]) {
    const foundStudents = await StudentModel.find({
      _id: { $in: studentsId },
    }).exec();

    return foundStudents;
  }

  async getDetails(studentId: string) {
    const student = await StudentModel.findById(studentId);

    return student;
  }

  async findByClassroom(classroom: Classroom) {}
}
