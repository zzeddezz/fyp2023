import { Outlet } from "react-router-dom";
import SignInBasic from "layouts/authentication/sign-in/basic";

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

export default function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <SignInBasic />; // Expected to return a 404 component instead
}
