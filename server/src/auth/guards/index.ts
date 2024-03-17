export * from './jwt-auth.guard';
export * from './role.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';

export const GUARDS = [JwtAuthGuard, RolesGuard];
