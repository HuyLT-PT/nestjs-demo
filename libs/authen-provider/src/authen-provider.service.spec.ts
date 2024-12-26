import { Test, TestingModule } from '@nestjs/testing';
import { AuthenProviderService } from './authen-provider.service';

describe('AuthenProviderService', () => {
  let service: AuthenProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenProviderService],
    }).compile();

    service = module.get<AuthenProviderService>(AuthenProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
