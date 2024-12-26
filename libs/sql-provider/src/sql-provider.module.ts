import { Module } from '@nestjs/common';
import { SqlProviderService } from './sql-provider.service';

@Module({
  providers: [SqlProviderService],
  exports: [SqlProviderService],
})
export class SqlProviderModule {}
