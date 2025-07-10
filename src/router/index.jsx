import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
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
        <Login />
      </GuestOnlyRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
