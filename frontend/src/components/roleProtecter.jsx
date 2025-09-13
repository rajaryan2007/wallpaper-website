import { Navigate } from "react-router-dom";
import { useAuth } from "./protected";

export function RoleProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== role) {
    return <Navigate to="/all-image" replace />;
  }
  return children;
}
