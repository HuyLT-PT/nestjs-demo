import { Test, TestingModule } from '@nestjs/testing';
import { LoggingProviderService } from './logging-provider.service';

describe('LoggingProviderService', () => {
  let service: LoggingProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingProviderService],
    }).compile();

    service = module.get<LoggingProviderService>(LoggingProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
