import { Test, TestingModule } from '@nestjs/testing';
import { RateLimitProviderService } from './rate-limit-provider.service';

describe('RateLimitProviderService', () => {
  let service: RateLimitProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateLimitProviderService],
    }).compile();

    service = module.get<RateLimitProviderService>(RateLimitProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
