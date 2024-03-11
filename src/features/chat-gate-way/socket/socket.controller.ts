import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocketService } from './socket.service';

@Controller('messages')
@ApiTags('messages')
export class SocketController {
  constructor(
    @Inject(SocketService) private readonly socketService: SocketService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'add a message' })
  @ApiResponse({ status: 201, description: 'message' })
  async enviarMensaje(@Body() body) {
    return this.socketService.createMessage(body.mensaje);
  }
  @Get()
  @ApiOperation({ summary: 'add a message' })
  @ApiResponse({ status: 201, description: 'message' })
  async getMessages(
    @Query('teacherId') teacherId,
    @Query('studentId') studentId,
  ) {
    return this.socketService.getMessagesByStudentAndTeacher(
      studentId,
      teacherId,
    );
  }
  //   @Get(':userId')
  //   @ApiOperation({ summary: 'get a student' }) // Documenta la ruta
  //   @ApiResponse({ status: 201, description: 'right student' })
  //   async addStudents(@Param('userId') userId: string) {
  //     return this.studentService.findOne(userId);
  //   }
  //   @Post('/modify')
  //   @ApiOperation({ summary: 'Get user' }) // Documenta la ruta
  //   @ApiResponse({ status: 201, description: 'loggeado' })
  //   async modify(@Body() user) {
  //     return this.studentService.modify(user);
  //   }

  //   @Get()
  //   @ApiOperation({ summary: 'all students' })
  //   @ApiResponse({ status: 201, description: 'students' })
  //   async getAllStudents() {
  //     return this.studentService.findAll();
  //   }
  //   @Post('/acceptReviewDetails')
  //   @ApiOperation({ summary: 'get details of a student' }) // Documenta la ruta
  //   @ApiResponse({ status: 201, description: 'data collected' })
  //   async editDetailsStudent(@Body() detailsBody) {
  //     return this.studentService.editDetailsStudent(
  //       detailsBody.details,
  //       detailsBody.student.details._id.toString(),
  //       detailsBody.student,
  //     );
  //   }
}
