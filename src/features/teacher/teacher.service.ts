import { StudentService } from './../student/student.service';
import { Injectable } from '@nestjs/common';
import { TeacherModel } from '../../models/teacher.models';
import { User } from '../../models/user.model';
import mongoose from 'mongoose';

@Injectable()
export class TeacherService {
  constructor(private readonly studentService: StudentService) {}
  async create(user: User) {
    const newTeacher = new TeacherModel({ user });
    await newTeacher.save();
  }

  async findOne(userId: string) {
    const teacher = await TeacherModel.findOne({ user: userId });
    teacher.students = await this.getStudents(teacher.id);
    return teacher;
  }

  async getStudents(teacherId: string) {
    const teacher = await TeacherModel.findOne({ _id: teacherId });

    const students = this.studentService.findSomeStudents(teacher.students); // Buscar los estudiantes basados en los ObjectId

    return students;
  }

  async addStudents(teacherId: string, students: string[]) {
    const teacher = await TeacherModel.findById(teacherId);
    students.map((studentId) => {
      teacher.students.push(new mongoose.Types.ObjectId(studentId));
    });

    await teacher.save();
    return teacher;
  }
}
