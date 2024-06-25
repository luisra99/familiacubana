import { Navigate } from "react-router-dom";
import { getCookie } from "../helpers/cookies";

const AuthGuard = ({
  children,
  path,
}: {
  children: React.FC;
  path: string;
  childPath: string | boolean;
}) => {
  return !!getCookie("session_state") ? children : <Navigate to="/login" />;
};
export default AuthGuard;
