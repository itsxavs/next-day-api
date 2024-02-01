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
  async editDetailsStudent(detailsBody, detailsId) {
    const details = {
      _id: detailsId,

      pronouns: detailsBody.pronouns,
      nameParents: detailsBody.nameParents,
      surnameParents: detailsBody.surnameParents,
      emailParents: detailsBody.emailParents,
      pronounsParents: detailsBody.pronounsParents,
      address: detailsBody.address,
      province: detailsBody.province,
      city: detailsBody.city,
      phone: detailsBody.phone,
      additionalInformation: detailsBody.additionalInformation,
      zip: detailsBody.zip,
    };

    const updatedDetails = await DetailsStudentModel.findByIdAndUpdate(
      detailsId,
      details,
    );
    await updatedDetails.save();
    return updatedDetails;
  }

  async createReviewDetails(detailsBody) {
    const detailsStudent = await new DetailsStudentModel({
      pronouns: detailsBody.pronouns,
      nameParents: detailsBody.nameParents,
      surnameParents: detailsBody.surnameParents,
      emailParents: detailsBody.emailParents,
      pronounsParents: detailsBody.pronounsParents,
      address: detailsBody.address,
      province: detailsBody.province,
      city: detailsBody.city,
      phone: detailsBody.phone,
      additionalInformation: detailsBody.additionalInformation,
      zip: detailsBody.zip,
    });
    detailsStudent.save();
    return detailsStudent;
  }

  async removeReviewDetails(detailsId: string) {
    const details = await DetailsStudentModel.findByIdAndDelete(detailsId);
  }
}
