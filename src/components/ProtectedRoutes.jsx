import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  const location = useLocation();
  const restrictedRoutes = ["/likedImages", "/downloadImages", "/imageInfo"];
  const isRestricted = restrictedRoutes.includes(location.pathname);

  if (!user) return <Navigate to="/login" replace />;

  if (!user.emailVerified && isRestricted) return <Navigate to="/profile" replace />;

  return children;
};

export default ProtectedRoutes;
