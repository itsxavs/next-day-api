import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from './user.model';
import { Classroom } from './interface/classroom.interface';
import { Student } from './student.model';

export class Teacher {
  @prop({ ref: () => User })
  user: Ref<User>;
  @prop([{ type: () => Student }])
  students: Ref<Student>[];
  @prop()
  classroom: Classroom[];
  @prop()
  name: string;
  @prop()
  firsname: string;
  @prop()
  lastname: string;
}

export const TeacherModel = getModelForClass(Teacher);
