import { Injectable } from '@nestjs/common';
import {
  DetailsStudent,
  DetailsStudentModel,
} from '../../models/detailsStudent.model';
import { Ref } from '@typegoose/typegoose';

@Injectable()
export class DetailsUserService {
  constructor() {}

  async create() {
    const newDetailsStudent = new DetailsStudentModel();
    await newDetailsStudent.save();
    return newDetailsStudent;
  }
  async getDetailsStudent(detailsId: Ref<DetailsStudent>) {
    const details = await DetailsStudentModel.findById(detailsId);
    return details;
  }
}
