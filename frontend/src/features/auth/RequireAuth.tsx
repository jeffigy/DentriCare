import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type RequireAuthProps = {
  allowedRoles: string[];
};

//! observe if the below is correct
const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  return roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
