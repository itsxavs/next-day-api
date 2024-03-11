import { Injectable } from '@nestjs/common';
import { MessageModel } from 'src/models/message.model';

@Injectable()
export class SocketService {
  constructor() {}

  async createMessage(message: any) {
    let newMessage = new MessageModel({
      ...message,
      sendDate: new Date(),
    });
    await newMessage.save();
    newMessage = await MessageModel.findById(newMessage._id)
      .populate('teacher')
      .populate('student');
    return newMessage;
  }

  async getMessagesByStudent(studentId: string) {
    const messages = await MessageModel.find({ student: studentId })
      .populate('teacher')
      .populate('student');
    return messages;
  }

  async getMessagesByTeacher(teacherId: string) {
    const messages = await MessageModel.find({ teacher: teacherId })
      .populate('teacher')
      .populate('student');
    return messages;
  }

  async getMessagesByStudentAndTeacher(studentId: string, teacherId: string) {
    const messages = await MessageModel.find({
      teacher: teacherId,
      student: studentId,
    })
      .populate('teacher')
      .populate('student');
    return messages;
  }

  async leidoTeacher(studentId: string, teacherId: string) {
    const messages = await MessageModel.updateMany(
      { teacher: teacherId, student: studentId },
      { leidoTeacher: true },
    );
    return messages;
  }

  async leidoStudent(studentId: string, teacherId: string) {
    const messages = await MessageModel.updateMany(
      { teacher: teacherId, student: studentId },
      { leidoStudent: true },
    );
    return messages;
  }
}
