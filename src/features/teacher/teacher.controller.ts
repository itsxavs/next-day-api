import { TeacherService } from 'src/features/teacher/teacher.service';
import { Body, Controller, Post, Inject, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { addStudentBody } from 'src/dto/addStudentsBody.dto';

@Controller('teacher')
@ApiTags('teacher')
export class TeacherController {
  constructor(
    @Inject(TeacherService) private readonly teacherService: TeacherService,
  ) {}

  @Post('/addStudents')
  @ApiOperation({ summary: 'add students to teacher' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async addStudents(@Body() m: addStudentBody) {
    return this.teacherService.addStudents(m.teacher, m.students);
  }
  @Post('/getStudents')
  @ApiOperation({ summary: 'add students to teacher' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async getStudents(@Body() m: addStudentBody) {
    return this.teacherService.getStudents(m.teacher);
  }

  @Get('/studentByTeacher')
  @ApiOperation({ summary: 'add students to teacher' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async studentByTeacher(@Query('teacherId') teacherId) {
    return this.teacherService.getStudents(teacherId);
  }
}

// Ver si metiendo solo el id aunque lo mencione como objeto sirve ya que se tiene la referencia del objeto {Object('id)} es lo mismo que
// el objeto entero de student y cuando lo compruebe como ese id es unico se guarda el que esta en la base de datos
