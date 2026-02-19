import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useApp, UserRole } from "@/contexts/app-context";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser } = useApp();

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check role
  const userRole = "role" in currentUser ? currentUser.role : "company";
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
