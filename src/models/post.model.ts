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
  message: string;
  @prop()
  file: Buffer;
  @prop()
  fileName: string;
  @prop()
  subject: string;
  @prop()
  classroom: string;
  @prop()
  status: string;
  @prop()
  exerciceDone: Buffer;
  @prop()
  exerciceDoneName: string;
  @prop()
  exerciceReview: Buffer;
  @prop()
  exerciceReviewName: string;
  @prop()
  dateStart: Date;
  @prop()
  dateEnd: Date;
}

export const PostModel = getModelForClass(Post);
