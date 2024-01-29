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
    console.log(files);
    const post = body.post;
    const bufferFile = files[0].buffer; // Accede a bufferFile en lugar de buffer
    return this.postService.savePost(post, bufferFile);
  }

  @Get()
  @ApiOperation({ summary: 'get all posts by teacher' })
  @ApiResponse({ status: 201, description: 'post collected' })
  async getAllPostByTeacher(@Query('teacherId') teacherId) {
    return this.postService.getAllPostByTeacher(teacherId);
  }

  @Get()
  @ApiOperation({ summary: 'get all posts by student' })
  @ApiResponse({ status: 201, description: 'post collected' })
  async getAllPostByStudent(@Query('studentId') studentId) {
    return this.postService.getAllPostByStudent(studentId);
  }

  @Get('/file')
  async getPost(@Res() res: Response, @Query('postId') postId: string) {
    const file = await this.postService.getFile(postId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=post.pdf');
    res.send(file);
  }
}
