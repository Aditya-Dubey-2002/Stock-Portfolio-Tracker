import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
    // console.log(token);
  if (!token) {
    // Redirect to login page if no token exists
    return <Navigate to="/auth/signin" />;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Token expired
      localStorage.removeItem('token');
      alert('Session expired. Please log in again.');
      return <Navigate to="/login" />;
    }
  } catch (error) {
    // Invalid token
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return <>{children}</>;  // Render children (protected page) if token exists
};

export default ProtectedRoute;
