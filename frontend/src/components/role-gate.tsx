"use client";

import { UserRole } from "@/auth";
import { useCurrentRole } from "@/hooks/use-current-role";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const currentRole = useCurrentRole();

  if (!currentRole || !allowedRoles.includes(currentRole)) return null;
  return <>{children}</>;
};
