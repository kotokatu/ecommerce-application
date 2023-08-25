import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../utils/hooks/useAuth';

type ProtectedRouteProps = {
  children?: React.ReactNode;
  redirectPath?: string;
};

const ProtectedRoute = ({ children, redirectPath = '/' }: ProtectedRouteProps) => {
  const location = useLocation();
  const { userLoggedIn } = useAuth();

  if (userLoggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
