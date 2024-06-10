import { writeFile } from 'fs/promises';
import { PostModel } from './../../models/post.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { pre } from '@typegoose/typegoose';
import { StudentModel } from 'src/models/student.model';

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

  async addCalificacion(postId, calificacion) {
    const post = await PostModel.findById(postId);
    post.presentacion = calificacion.presentacion;
    post.organizacion = calificacion.organizacion;
    post.exactitud = calificacion.exactitud;
    post.general = calificacion.general;

    await post.save();
    return post;
  }

  async getReview(studentId) {
    let posts = await PostModel.find({
      student: studentId,
      status: 'DONE',
    }).select(
      'teacher student title presentacion organizacion exactitud general',
    );

    let sumaCalificaciones = posts.reduce(
      (calificaciones, post, i) => {
        return {
          presentacion:
            Math.max(1, post?.presentacion) + calificaciones.presentacion,
          organizacion:
            Math.max(1, post?.organizacion) + calificaciones.organizacion,
          exactitud: Math.max(1, post?.exactitud) + calificaciones.exactitud,
          general: Math.max(1, post?.general) + calificaciones.general,
          puntos: parseFloat(
            (
              post.presentacion +
              post.organizacion +
              post.exactitud +
              post.general +
              calificaciones.puntos
            ).toFixed(2),
          ),
        };
      },
      {
        presentacion: 0,
        organizacion: 0,
        exactitud: 0,
        general: 0,
        puntos: 0,
      },
    );

    let calificacionesGeneral = {
      presentacion: sumaCalificaciones.presentacion / Math.max(1, posts.length),
      organizacion: sumaCalificaciones.organizacion / Math.max(1, posts.length),
      exactitud: sumaCalificaciones.exactitud / Math.max(1, posts.length),
      general: sumaCalificaciones.general / Math.max(1, posts.length),
    };

    const resultado = {
      posts: posts,
      calificacionesGeneral: calificacionesGeneral,
      puntosPorAspecto: sumaCalificaciones,
    };

    return resultado;
  }

  async getCalificacionesAlumnos(studentsId: string[]) {
    return Promise.all(
      studentsId.map(async (studentId) => {
        return {
          student: await StudentModel.findById(studentId),
          resultado: await this.getReview(studentId),
        };
      }),
    );
  }
}
