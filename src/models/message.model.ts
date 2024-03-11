import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { Teacher } from './teacher.models';
import { Student } from './student.model';

export class Message {
  @prop({ ref: () => Teacher })
  teacher: Ref<Teacher>;
  @prop({ ref: () => Student })
  student: Ref<Student>;
  @prop()
  message: string;
  @prop()
  leidoTeacher: boolean;
  @prop()
  leidoStudent: boolean;
  @prop()
  sendDate: Date;
  @prop()
  role;
}

export const MessageModel = getModelForClass(Message);
