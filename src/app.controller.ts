import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test-database-connection')
  async testDatabase() {
    console.log('mek');
    const isConnected = await this.appService.testDatabaseConnection();
    if (isConnected) {
      return 'Conexión exitosa a la base de datos.';
    } else {
      return 'Error al conectar a la base de datos.';
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
