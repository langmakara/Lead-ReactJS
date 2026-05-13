import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}