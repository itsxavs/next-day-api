import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from '../models/enum/roles.enum';
import { IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ description: 'Dirección de correo electrónico' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  password: string;

  @ApiProperty({ description: 'role' })
  role: ROLES;

  @ApiProperty({ description: 'name' })
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'firstname' })
  @IsOptional()
  firstName: string;

  @ApiProperty({ description: 'lastname' })
  @IsOptional()
  lastName: string;
}
