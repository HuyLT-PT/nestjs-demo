import { Test, TestingModule } from '@nestjs/testing';
import { ConfigProviderService } from './config-provider.service';

describe('ConfigProviderService', () => {
  let service: ConfigProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigProviderService],
    }).compile();

    service = module.get<ConfigProviderService>(ConfigProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
