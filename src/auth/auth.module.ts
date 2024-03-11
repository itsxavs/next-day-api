import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { StudentModule } from '../features/student/student.module';
import { TeacherModule } from '../features/teacher/teacher.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'tu-clave-secreta', // Cambia esto a tu clave secreta
      signOptions: { expiresIn: '1h' }, // Configura la expiración del token
    }),
    StudentModule,
    TeacherModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: 'UserModel', useValue: Model<User> }],
  exports: [AuthService],
})
export class AuthModule {}
