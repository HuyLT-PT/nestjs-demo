import { Module } from '@nestjs/common';
import { CacheProviderService } from './cache-provider.service';

@Module({
  providers: [CacheProviderService],
  exports: [CacheProviderService],
})
export class CacheProviderModule {}
