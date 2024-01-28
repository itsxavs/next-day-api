import { Controller, Inject, Get, Param, Post, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('students')
@ApiTags('students')
export class StudentController {
  constructor(
    @Inject(StudentService) private readonly studentService: StudentService,
  ) {}

  @Get(':userId')
  @ApiOperation({ summary: 'get a student' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'right student' })
  async addStudents(@Param('userId') userId: string) {
    return this.studentService.findOne(userId);
  }
  @Post('/modify')
  @ApiOperation({ summary: 'Get user' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'loggeado' })
  async modify(@Body() user) {
    return this.studentService.modify(user);
  }

  @Get()
  @ApiOperation({ summary: 'all students' })
  @ApiResponse({ status: 201, description: 'students' })
  async getAllStudents() {
    return this.studentService.findAll();
  }
}
