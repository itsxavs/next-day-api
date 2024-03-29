import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { Classroom } from './interface/classroom.interface';
import { DetailsStudent } from './detailsStudent.model';
import { User } from './user.model';
import { Teacher } from './teacher.models';

export class Student {
  @prop({ ref: () => User })
  user: Ref<User>;
  @prop()
  name: string;
  @prop()
  firsname: string;
  @prop()
  lastname: string;
  @prop()
  email: string;
  @prop()
  classroom: Classroom;
  @prop({ ref: () => DetailsStudent })
  details: Ref<DetailsStudent>;
  @prop({ ref: () => DetailsStudent })
  reviewDetails: Ref<DetailsStudent>;
  @prop({ ref: () => Teacher })
  teachers: Ref<Teacher>[];
}

export const StudentModel = getModelForClass(Student);
