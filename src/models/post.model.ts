import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { Teacher } from './teacher.models';
import { Student } from './student.model';
import { SUBJECT } from './enum/subject.enum';

export class File {
  @prop()
  name: string;
  @prop()
  file: Buffer;
}

export class Post {
  @prop({ ref: () => Teacher })
  teacherId: Ref<Teacher>;
  @prop({ ref: () => Student })
  studentId: Ref<Student>;

  @prop()
  title: string;
  @prop()
  description: string;
  @prop({ ref: () => File })
  file: Ref<File>;
  @prop()
  subjects: SUBJECT;
}

export const FileModel = getModelForClass(File);
export const PostModel = getModelForClass(Post);
