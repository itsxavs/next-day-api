import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/save')
  @ApiOperation({ summary: 'save post' })
  @ApiResponse({ status: 201, description: 'data collected' })
  async editDetailsStudent(@Body() post) {
    return this.postService.savePost(post);
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
