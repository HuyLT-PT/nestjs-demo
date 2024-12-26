import { Module } from '@nestjs/common';
import { NotificationProviderService } from './notification-provider.service';

@Module({
  providers: [NotificationProviderService],
  exports: [NotificationProviderService],
})
export class NotificationProviderModule {}
