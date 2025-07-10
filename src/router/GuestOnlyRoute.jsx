import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function GuestOnlyRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/" replace />; // sudah login → redirect
  return children;
}
