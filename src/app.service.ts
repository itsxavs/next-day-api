import { AuthService } from './auth/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly authService: AuthService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async testDatabaseConnection() {
    try {
      await this.connection.db.stats();
      console.log('Conexión exitosa a la base de datos MongoDB.');
      return true;
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      return false;
    }
  }
}
