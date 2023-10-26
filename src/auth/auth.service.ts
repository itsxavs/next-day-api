import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async register({ username, password }: User) {
    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario en la base de datos

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    return new this.userModel(user).save();
  }

  async login({ username, password }: User) {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return null; // Usuario no encontrado
    }

    // Verifica la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null; // Contraseña incorrecta
    }

    // Genera un token JWT
    const payload = { sub: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
