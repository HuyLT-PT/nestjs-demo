import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ValuesImportant } from '../enums/constants';
import { hideImportantInformation } from '../utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const body = hideImportantInformation(req.body, ValuesImportant);

    this.logger.log('LoggerMiddleware');
    this.logger.debug(`[${req.method}]-[${req.ip}]: ${req.originalUrl}`);
    (async () => {
      try {
        const str = JSON.stringify(body);

        if (str.length < 2000) {
          this.logger.debug(str);
        } else {
          this.logger.debug('Body too large');
        }
      } catch (error) {
        this.logger.error(error);
      }
    })();
    next();
  }
}
