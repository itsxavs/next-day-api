import { Injectable } from '@nestjs/common';
import { DetailsStudentModel } from '../../models/detailsStudent.model';

@Injectable()
export class DetailsUserService {
  constructor() {}

  async create() {
    const newDetailsStudent = new DetailsStudentModel();
    await newDetailsStudent.save();
    return newDetailsStudent;
  }
  async getDetailsStudent(detailsId: string) {
    const details = await DetailsStudentModel.findById(detailsId);
    return details;
  }
  async editDetailsStudent(detailsBody) {
    const details = {
      _id: detailsBody?.detailsId,
      firstname: 'firstname',
      pronouns: detailsBody.details.pronouns,
      nameParents: detailsBody.details.nameParents,
      surnameParents: detailsBody.details.surnameParents,
      emailParents: detailsBody.details.emailParents,
      pronounsParents: detailsBody.details.pronounsParents,
      address: detailsBody.details.address,
      province: detailsBody.details.province,
      city: detailsBody.details.city,
      phone: detailsBody.details.phone,
      additionalInformation: detailsBody.details.additionalInformation,
      zip: detailsBody.details.zip,
    };

    const updatedDetails = await DetailsStudentModel.findByIdAndUpdate(
      detailsBody?.detailsId,
      details,
    );
    updatedDetails.save();
    return updatedDetails;
  }
}
