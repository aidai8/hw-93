import { UserRole } from '../schemas/user.schema';

export class RegisterUserDto {
  email: string;
  displayName: string;
  password: string;
  role?: UserRole;
}
