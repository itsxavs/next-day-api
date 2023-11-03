import { ApiProperty } from '@nestjs/swagger';

export class addStudentBody {
  @ApiProperty({ description: 'Nombre de usuario' })
  teacher: string;
  @ApiProperty({ description: 'Nombre de usuario' })
  students: string[];
}
