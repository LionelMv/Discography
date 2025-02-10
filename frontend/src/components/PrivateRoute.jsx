import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    localStorage.setItem("redirected", "true");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
