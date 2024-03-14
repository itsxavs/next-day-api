import { writeFile } from 'fs/promises';
import { PostModel } from './../../models/post.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
  async savePost(post, fileBuffer, fileName) {
    // Genera un nombre de archivo único

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
          fileName: fileName,
          teacher: post.teacher,
          student: studentId,
          message: post.message,
          title: post.title,
          subject: post.subject,
          classroom: post.classroom,
          dateStart: new Date(),
          dateEnd: new Date(post.dateEnd),
          status: 'DO',
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

  async addFiletoReview(fileBuffer, fileName, postId) {
    const post = await PostModel.findById(postId);
    post.exerciceReview = fileBuffer;
    post.exerciceReviewName = fileName;
    post.status = 'REVIEW';
    await post.save();
    return post;
  }
  async addFiletoDone(fileBuffer, fileName, postId) {
    const post = await PostModel.findById(postId);
    post.exerciceDone = fileBuffer;
    post.exerciceDoneName = fileName;
    post.status = 'DONE';
    await post.save();
    return post;
  }

  async getFile(postId) {
    let post = await PostModel.findById(postId);
    return post;
  }
}
