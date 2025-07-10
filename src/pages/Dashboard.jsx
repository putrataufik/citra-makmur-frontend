import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg text-gray-600">Selamat datang, {user?.name} !</p>
      <p className="text-lg text-gray-600">Role: {user?.role}</p>
      <p className="text-lg text-gray-600">ID: {user?._id}</p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
