import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import AdminDashboard from "./AdminDashboard";
function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ wait until auth loads
  if (loading) return null;

  // ❌ not logged in
  if (!user) return <Navigate to="/" />;

  // 🔥 SAFE role check (no crash)
  const role = user?.user?.role || user?.role;

  if (role !== "admin") {
    return <h2 className="text-center mt-5">Access Denied ❌</h2>;
  }
  

  return children;
}

export default AdminRoute;