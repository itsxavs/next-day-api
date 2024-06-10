import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/save')
  @ApiOperation({ summary: 'save post' })
  @UseInterceptors(FilesInterceptor('bufferFile'))
  @ApiResponse({ status: 201, description: 'data collected' })
  async editDetailsStudent(@UploadedFiles() files, @Body() body) {
    const post = body.post;
    const bufferFile = files[0].buffer;
    const filename = files[0].originalname; // Accede a bufferFile en lugar de buffer
    return this.postService.savePost(post, bufferFile, filename);
  }

  @Get()
  @ApiOperation({ summary: 'get all posts by teacher' })
  @ApiResponse({ status: 201, description: 'post collected' })
  async getAllPostByTeacher(@Query('teacherId') teacherId) {
    return this.postService.getAllPostByTeacher(teacherId);
  }

  @Get('/student')
  @ApiOperation({ summary: 'get all posts by student' })
  @ApiResponse({ status: 201, description: 'post collected' })
  async getAllPostByStudent(@Query('studentId') studentId) {
    return this.postService.getAllPostByStudent(studentId);
  }
  @Post('/addFiletoReview')
  @ApiOperation({ summary: 'get all posts by student' })
  @UseInterceptors(FilesInterceptor('bufferFile'))
  @ApiResponse({ status: 201, description: 'post collected' })
  async addFiletoReview(@UploadedFiles() files, @Body() body) {
    const bufferFile = files[0].buffer;
    const filename = files[0].originalname; // Accede a bufferFile en lugar de buffer
    return this.postService.addFiletoReview(bufferFile, filename, body.postId);
  }
  @Post('/addFiletoDone')
  @ApiOperation({ summary: 'get all posts by student' })
  @UseInterceptors(FilesInterceptor('bufferFile'))
  @ApiResponse({ status: 201, description: 'post collected' })
  async addFiletoDone(@UploadedFiles() files, @Body() body) {
    const bufferFile = files[0].buffer;
    const filename = files[0].originalname; // Accede a bufferFile en lugar de buffer
    return this.postService.addFiletoDone(bufferFile, filename, body.postId);
  }

  @Get('/file')
  async getPost(@Res() res: Response, @Query('postId') postId: string) {
    const file = await this.postService.getFile(postId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=post.pdf');
    res.send(file.file);
  }
  @Get('/fileReview')
  async getReview(@Res() res: Response, @Query('postId') postId: string) {
    const file = await this.postService.getFile(postId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=post.pdf');
    res.send(file.exerciceReview);
  }
  @Get('/fileDone')
  async getDone(@Res() res: Response, @Query('postId') postId: string) {
    const file = await this.postService.getFile(postId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=post.pdf');
    res.send(file.exerciceDone);
  }

  /*Añadir funcionalidad ranking*/

  @Post('/calificacion/add')
  async addCalificacion(@Body() body) {
    this.postService.addCalificacion(body.postId, body.calificacion);
  }
  @Get('/calificacion/alumno')
  async getCalificacionesAlumno(@Query('studentId') idStudent: string) {
    let resultado = await this.postService.getReview(idStudent);
    console.log(resultado);
    return resultado;
  }
  @Post('/calificaciones/alumnos')
  async getCalificacionesAlumnos(@Body() body) {
    let resultados = this.postService.getCalificacionesAlumnos(body);

    return resultados;
  }
}
