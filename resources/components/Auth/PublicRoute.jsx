import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, redirectPath = '/', children }) => {
  if (isAuthenticated) {
    // Jika sudah login, arahkan ke halaman utama
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;
