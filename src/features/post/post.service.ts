import { writeFile } from 'fs/promises';
import { PostModel } from './../../models/post.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
  async savePost(post, fileBuffer) {
    // Genera un nombre de archivo único
    const fileName = uuidv4() + '.pdf';
    const buffer = Buffer.from(JSON.stringify(fileBuffer));
    post = JSON.parse(post);
    let newPosts = [];

    // Guarda el archivo en el sistema de archivos
    await writeFile('./files/' + fileName, buffer);
    await post.students.forEach(async (studentId) => {
      newPosts = [
        ...newPosts,
        await new PostModel({
          file: fileBuffer,
          teacher: post.teacher,
          student: studentId,
          description: post.description,
          title: post.title,
          subjects: post.subjects,
          classroom: post.classroom,
        }).save(),
      ];
    });
    return newPosts;
  }

  async getPostWithStudentAndTeacher(postId) {
    let post = await PostModel.findById(postId)
      .populate('student') // Reemplaza el campo 'student' por el documento correspondiente de la colección 'Student'
      .populate('teacher'); // Reemplaza el campo 'teacher' por el documento correspondiente de la colección 'Teacher'
    return post;
  }

  async getAllPostByStudent(studentId) {
    let posts = await PostModel.find({ student: studentId })
      .populate('student') // Reemplaza el campo 'student' por el documento correspondiente de la colección 'Student'
      .populate('teacher');
    return posts;
  }
  async getAllPostByTeacher(teacherId) {
    let posts = await PostModel.find({ teacher: teacherId })
      .populate('student') // Reemplaza el campo 'student' por el documento correspondiente de la colección 'Student'
      .populate('teacher');
    return posts;
  }

  async getFile(postId) {
    let post = await PostModel.findById(postId);
    return post.file;
  }
}
