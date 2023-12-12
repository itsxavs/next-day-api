import { Module } from '@nestjs/common';
import { DetailsUserService } from './details-user.service';
import { DetailsStudent } from 'src/models/detailsStudent.model';
import { Model } from 'mongoose';
import { DetailsUserController } from './details-user.controller';

@Module({
  providers: [
    DetailsUserService,
    { provide: 'DetailsUserModel', useValue: Model<DetailsStudent> },
  ],
  exports: [DetailsUserService],
  controllers: [DetailsUserController],
})
export class DetailsUserModule {}
