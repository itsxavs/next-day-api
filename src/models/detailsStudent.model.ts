import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { PRONOUNS } from './enum/pronouns.enum';
import { Student } from './student.model';

export class DetailsStudent {
  @prop()
  pronouns: PRONOUNS;
  @prop()
  nameParents: string;
  @prop()
  surnameParents: string;
  @prop()
  emailParents: string;
  @prop()
  pronounsParents: string;
  @prop()
  address: string;
  @prop()
  province: string;
  @prop()
  city: string;
  @prop()
  zip: string;
  @prop()
  phone: string;
  @prop()
  additionalInformation: string;
  @prop()
  reviewing: boolean;
}

export const DetailsStudentModel = getModelForClass(DetailsStudent);
