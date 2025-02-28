import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";


const PrivateRoute = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
