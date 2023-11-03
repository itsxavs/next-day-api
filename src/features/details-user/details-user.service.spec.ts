import { Test, TestingModule } from '@nestjs/testing';
import { DetailsUserService } from './details-user.service';

describe('DetailsUserService', () => {
  let service: DetailsUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailsUserService],
    }).compile();

    service = module.get<DetailsUserService>(DetailsUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
