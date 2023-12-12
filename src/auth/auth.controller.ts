import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('authorization') // Etiqueta el controlador
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('/singUp')
  @ApiOperation({ summary: 'Create user' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async createUser(@Body() createUserDto: UserDto) {
    return this.authService.register(createUserDto);
  }
  @Post('/signIn')
  @ApiOperation({ summary: 'Get user' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'loggeado' })
  async getuser(@Body() user: UserDto) {
    return this.authService.login(user);
  }
  @Post('/modify')
  @ApiOperation({ summary: 'Get user' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'loggeado' })
  async modify(@Body() user) {
    return this.authService.modify(user);
  }
}
