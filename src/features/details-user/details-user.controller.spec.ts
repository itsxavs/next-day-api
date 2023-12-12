import { Test, TestingModule } from '@nestjs/testing';
import { DetailsUserController } from './details-user.controller';

describe('DetailsUserController', () => {
  let controller: DetailsUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsUserController],
    }).compile();

    controller = module.get<DetailsUserController>(DetailsUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
