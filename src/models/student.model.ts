import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { ROLES } from './enum/roles.enum';
import { Classroom } from './interface/classroom.interface';
import { SUBJECT } from './enum/subject.enum';
import { DetailsStudent } from './detailsStudent.model';
import { User } from './user.model';

export class Student {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop()
  classroom: Classroom;
  @prop()
  subjects: SUBJECT[];
  @prop({ ref: () => DetailsStudent })
  details: Ref<DetailsStudent>;
}

export const StudentModel = getModelForClass(Student);
