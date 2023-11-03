import { Module } from '@nestjs/common';
import { DetailsUserService } from './details-user.service';
import { DetailsStudent } from 'src/models/detailsStudent.model';
import { Model } from 'mongoose';

@Module({
  providers: [
    DetailsUserService,
    { provide: 'DetailsUserModel', useValue: Model<DetailsStudent> },
  ],
  exports: [DetailsUserService],
})
export class DetailsUserModule {}
