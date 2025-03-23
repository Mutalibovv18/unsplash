import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
