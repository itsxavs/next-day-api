import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ description: 'Dirección de correo electrónico' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  password: string;
}
