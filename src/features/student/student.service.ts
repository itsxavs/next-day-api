import { User } from 'src/models/user.model';
import { Student, StudentModel } from './../../models/student.model';
import { Injectable } from '@nestjs/common';
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
    if (foundStudent.reviewDetails) {
      const reviewDetails = await this.detailsStudentService.getDetailsStudent(
        foundStudent.reviewDetails._id.toString(),
      );
      foundStudent.reviewDetails = reviewDetails;
    }

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
      if (student.reviewDetails) {
        const reviewDetails =
          await this.detailsStudentService.getDetailsStudent(
            student.reviewDetails._id.toString(),
          );
        student.reviewDetails = reviewDetails;
      }
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
      student._id,
      student.student,
    );
    const details = await this.detailsStudentService.getDetailsStudent(
      updatedStudent.details._id.toString(),
    );
    if (updatedStudent.reviewDetails) {
      const reviewDetails = await this.detailsStudentService.getDetailsStudent(
        updatedStudent.reviewDetails._id.toString(),
      );
      updatedStudent.reviewDetails = reviewDetails;
    }
    updatedStudent.details = details;
    await updatedStudent.save();
    return updatedStudent;
  }

  async findAll() {
    const students = await StudentModel.find().populate('user').exec();
    return students;
  }

  async createReviewDetails(student, detailsStudent) {
    const studentEdit = await this.modify(student);
    const reviewDetails =
      await this.detailsStudentService.createReviewDetails(detailsStudent);
    if (studentEdit.reviewDetails)
      await this.detailsStudentService.removeReviewDetails(
        studentEdit.reviewDetails._id.toString(),
      );
    studentEdit.reviewDetails = reviewDetails;
    await studentEdit.save();
  }

  async editDetailsStudent(detailsBody, detailsId, student) {
    const studentEdit = await this.modify(student);
    const details = await this.detailsStudentService.editDetailsStudent(
      detailsBody,
      detailsId,
    );
    await this.detailsStudentService.removeReviewDetails(detailsBody._id);
    studentEdit.reviewDetails = null;
    studentEdit.details = details;
    await studentEdit.save();

    return details;
  }
  async editDetailsStudent2(detailsBody, detailsId, student) {
    student.reviewDetails = null;
    const studentEdit = await this.modify(student);
    await this.detailsStudentService.removeReviewDetails(detailsBody._id);

    await studentEdit.save();

    return { json: 'details removed' };
  }
}
