import { useAppSelector } from "app/hooks";
import { selectCurrentToken } from "features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  roles: string[];
  email: string;
}

interface JWTPayload {
  UserInfo: UserInfo;
}

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  let status = "Employee";
  let isAdmin = false;
  let isSuperAdmin = false;

  if (token) {
    const decoded = jwtDecode<JWTPayload>(token);
    const { roles, email } = decoded.UserInfo;

    if (roles.includes("Admin")) {
      status = "Admin";
      isAdmin = true;
    }
    if (roles.includes("SuperAdmin")) {
      status = "SuperAdmin";
      isSuperAdmin = true;
    }

    return { email, roles, isAdmin, isSuperAdmin, status };
  }
  return { email: "", roles: [], isAdmin, isSuperAdmin, status };
};
export default useAuth;
