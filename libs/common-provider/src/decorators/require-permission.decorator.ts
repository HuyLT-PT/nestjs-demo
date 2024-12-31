import { SetMetadata } from "@nestjs/common";

export const REQUIRE_PERMISSION_KEY = 'REQUIRE_PERMISSION_KEY';
export const RequirePermission = (...permissions: string[]) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, permissions);
