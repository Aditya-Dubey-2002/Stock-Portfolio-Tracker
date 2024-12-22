import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
    console.log(token);
  if (!token) {
    // Redirect to login page if no token exists
    return <Navigate to="/auth/signin" />;
  }

  return <>{children}</>;  // Render children (protected page) if token exists
};

export default ProtectedRoute;
