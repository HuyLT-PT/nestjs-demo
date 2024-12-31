import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Forbidden } from '../exceptions';

@Injectable()
export class WhileListIpMiddleware implements NestMiddleware {
  private readonly logger = new Logger(WhileListIpMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.socket.remoteAddress;
    this.logger.log(ip);
    const allowedIps = ['::1', '127.0.0.1', 'localhost', '::ffff:127.0.0.1'];

    if (!allowedIps.includes(ip)) {
      throw new Forbidden('Your Ip is not allowed to access this resource');
    }

    next();
  }
}
