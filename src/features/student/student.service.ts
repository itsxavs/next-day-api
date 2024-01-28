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
    const foundStudent = await StudentModel.findOne({ user: userId });
    if (foundStudent === null) return null;
    const details = await this.detailsStudentService.getDetailsStudent(
      foundStudent.details._id.toString(),
    );
    // const details = await this.detailsStudentService.getDetailsStudent(
    //   foundStudent.details,
    // );
    foundStudent.details = details;
    return foundStudent;
  }

  async findSomeStudents(studentsId: Ref<Student>[]) {
    const foundStudents = await StudentModel.find({
      _id: { $in: studentsId },
    }).exec();
    for (let student of foundStudents) {
      const details = await this.detailsStudentService.getDetailsStudent(
        student.details._id.toString(),
      );
      student.details = details;
    }

    return foundStudents;
  }

  async getDetails(studentId: string) {
    const student = await StudentModel.findById(studentId);

    return student;
  }

  async modify(student) {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      student.studentId,
      student.student,
    );
    updatedStudent.save();
    const details = await this.detailsStudentService.getDetailsStudent(
      updatedStudent.details.toString(),
    );
    updatedStudent.details = details;
    return updatedStudent;
  }

  async findAll() {
    const students = await StudentModel.find().populate('user').exec();
    return students;
  }

  async findByClassroom(classroom: Classroom) {}
}
