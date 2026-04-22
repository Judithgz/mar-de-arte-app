import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const hasToken = isAdmin || !!localStorage.getItem('token');
  return hasToken ? <>{children}</> : <Navigate to="/login" replace />;
}
