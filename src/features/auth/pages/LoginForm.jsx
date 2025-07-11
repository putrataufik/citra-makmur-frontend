import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, getProfile } from '../authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({});

  const validate = () => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!username.trim()) {
      errors.username = 'Username wajib diisi';
    } else if (!usernameRegex.test(username)) {
      errors.username = 'Username harus 3-20 karakter alfanumerik tanpa simbol.';
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!password.trim()) {
      errors.password = 'Password wajib diisi';
    } else if (!passwordRegex.test(password)) {
      errors.password =
        'Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol.';
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
      await dispatch(getProfile());
      navigate('/');
    } else {
      setError(result.payload);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="relative h-[50px]">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setFormError((prev) => ({ ...prev, username: '' }));
          }}
          className={`w-full px-4 py-2 border-2 rounded-lg text-sm ${formError.username ? 'border-red-500' : 'border-gray-200'
            }`}
        />
        {formError.username && (
          <p className="absolute text-red-600 text-sm mt-1">
            {formError.username}
          </p>
        )}
      </div>

      <div className="relative h-[50px]">
        <input
          type={show ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFormError((prev) => ({ ...prev, password: '' }));
          }}
          className={`w-full px-4 py-2 border-2 rounded-lg text-sm ${formError.password ? 'border-red-500' : 'border-gray-200'
            }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-2 right-3 text-gray-500 text-sm"
        >
          {show ? '🙈' : '🙊'}
        </button>
        {formError.password && (
          <p className="absolute text-red-600 text-sm mt-1">
            {formError.password}
          </p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
        Log In
      </button>
    </form>
  );
}
