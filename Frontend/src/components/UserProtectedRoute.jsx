import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const userEmail = localStorage.getItem("userEmail"); // Check if user is logged in

  return userEmail ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;
