import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../features/auth/pages/AuthPage';
import Dashboard from '../features/dashboard/pages/Dashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import GuestOnlyRoute from './GuestOnlyRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <GuestOnlyRoute>
        <AuthPage />
      </GuestOnlyRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
