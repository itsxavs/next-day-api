import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    JwtModule.register({
      secret: 'tu-clave-secreta', // Cambia esto a tu clave secreta
      signOptions: { expiresIn: '1h' }, // Configura la expiración del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: 'UserModel', useValue: Model<User> }],
  exports: [AuthService],
})
export class AuthModule {}
