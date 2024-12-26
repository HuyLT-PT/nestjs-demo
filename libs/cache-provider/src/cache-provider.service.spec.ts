import { Test, TestingModule } from '@nestjs/testing';
import { CacheProviderService } from './cache-provider.service';

describe('CacheProviderService', () => {
  let service: CacheProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheProviderService],
    }).compile();

    service = module.get<CacheProviderService>(CacheProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
