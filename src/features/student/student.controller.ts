import { Controller, Inject, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
  constructor(
    @Inject(StudentService) private readonly studentService: StudentService,
  ) {}

  @Get(':studentId')
  @ApiOperation({ summary: 'get a student' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'right student' })
  async addStudents(@Param('studentId') studentId: string) {
    return this.studentService.findOne(studentId);
  }
}
