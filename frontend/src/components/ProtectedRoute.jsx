import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user || user.role !== role) {
      // arahkan ke halaman yang sesuai role-nya
      return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/"} replace />;
    }
  }

  return children;
}