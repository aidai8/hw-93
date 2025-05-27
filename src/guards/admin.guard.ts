import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from '../schemas/user.schema';
import { UserRole } from '../schemas/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: UserDocument }>();
    const user = req.user;

    if (user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'Only Admin has an access for this activity',
      );
    }

    return true;
  }
}
