import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { is_admin } = JSON.parse(localStorage.getItem("user"));

  if (!is_admin) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
