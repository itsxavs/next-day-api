import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';

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
    return this.postService.savePost(post, bufferFile);
  }

  @Get('/:teacherId')
  @ApiOperation({ summary: 'get all posts by teacher' })
  @ApiResponse({ status: 201, description: 'post collected' })
  async getAllPostByTeacher(@Param() teacherId) {
    return this.postService.getAllPostByTeacher(teacherId);
  }

  @Get('/:studentId')
  @ApiOperation({ summary: 'get all posts by student' })
  @ApiResponse({ status: 201, description: 'post collected' })
  async getAllPostByStudent(@Param() studentId) {
    return this.postService.getAllPostByStudent(studentId);
  }
}
