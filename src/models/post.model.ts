import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { Teacher } from './teacher.models';
import { Student } from './student.model';
import { SUBJECT } from './enum/subject.enum';

export class Post {
  @prop({ ref: () => Teacher })
  teacher: Ref<Teacher>;
  @prop({ ref: () => Student })
  student: Ref<Student>;
  @prop()
  title: string;
  @prop()
  description: string;
  @prop()
  file: Buffer;
  @prop()
  subjects: SUBJECT;
  @prop()
  classroom: string;
}

export const PostModel = getModelForClass(Post);
