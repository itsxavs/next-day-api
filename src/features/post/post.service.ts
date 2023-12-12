import { FileModel, PostModel } from './../../models/post.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async savePost(post) {
    let file = new FileModel();
    file.name = post.name;
    file.file = post.file;
    await file.save();
    let newPost = new PostModel();
    newPost.teacherId = Object('65454e65d1a5cf4a4c5f07bc');
    (newPost.studentId = Object(post.studentId)),
      (newPost.description = post.description),
      (newPost.title = post.title),
      (newPost.file = file),
      (newPost.subjects = post.subject);
    await newPost.save();
  }

  async getAllPostByStudent(studentId) {
    let posts = await PostModel.find({ studentId });
    return posts;
  }
  async getAllPostByTeacher(teacherId) {
    let posts = await PostModel.find({ teacherId });
    return posts;
  }
}
