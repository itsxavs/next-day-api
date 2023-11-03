import { getModelForClass, prop } from '@typegoose/typegoose';
import { ROLES } from './enum/roles.enum';

export class User {
  @prop()
  username: string;

  @prop()
  password: string;

  @prop()
  email: string;

  @prop()
  role: ROLES;
  @prop()
  name: string;
  @prop()
  firstName: string;
  @prop()
  lastName: string;
}

export const UserModel = getModelForClass(User);
