import { Test, TestingModule } from '@nestjs/testing';
import { SqlProviderService } from './sql-provider.service';

describe('SqlProviderService', () => {
  let service: SqlProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlProviderService],
    }).compile();

    service = module.get<SqlProviderService>(SqlProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
