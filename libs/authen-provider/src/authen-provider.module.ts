import { Module } from '@nestjs/common';
import { AuthenProviderService } from './authen-provider.service';

@Module({
  providers: [AuthenProviderService],
  exports: [AuthenProviderService],
})
export class AuthenProviderModule {}
