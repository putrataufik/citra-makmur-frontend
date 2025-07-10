import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './features/auth/authSlice';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, [token]);

  return <RouterProvider router={router} />;
}
