import { StudentService } from './../features/student/student.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserModel } from '../models/user.model';

import { ROLES } from '../models/enum/roles.enum';

import { TeacherService } from '../features/teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
  ) {}

  async register({ username, password, role, email }: User) {
    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario en la base de datos
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      role: ROLES[role],
      email,
    });
    await newUser.save();
    if (ROLES[role] === ROLES.STUDENT) {
      this.studentService.create(newUser);
    } else if (ROLES[role] === ROLES.TEACHER) {
      this.teacherService.create(newUser);
    } else {
      console.log('Ha habido un error');
    }

    return newUser;
  }

  async login({ username, password }: User) {
    let resultado;
    const user = await UserModel.findOne({ username: username });

    if (user?.role === 'TEACHER') {
      const teacher = await this.teacherService.findOne(user.id);
      // teacher.students.map((students)=> {
      // students.user = await UserModel.
      // })
      resultado = { user, teacher };
    } else if (user?.role === 'STUDENT') {
      const student = await this.studentService.findOne(user.id);
      if (student.teachers.length > 0)
        student.teachers = await this.teacherService.getTeachers(
          student.teachers,
        );
      resultado = { user, student };
    } else {
      return null;
    }

    // Verifica la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null; // Contraseña incorrecta
    }

    // Genera un token JWT
    const payload = { sub: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { ...resultado, token };
  }

  async modify(user) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user.userId,
      user.user,
    );
    updatedUser.save();
    return updatedUser;
  }

  // // Esto de que coja todo el user no me gusta, porque coge las passwords
  // async getFullNameUser(userId: Ref<User>) {
  //   const user = await UserModel.findById(userId);
  //   return user;
  // }
}
