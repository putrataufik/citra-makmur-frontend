import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
