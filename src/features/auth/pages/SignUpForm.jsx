import { useState } from 'react';
import api from '../../../services/api';

export default function SignUpForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    invitationCode: '',
  });

  const [formError, setFormError] = useState({});
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Nama wajib diisi';
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!form.username.trim()) {
      errors.username = 'Username wajib diisi';
    } else if (!usernameRegex.test(form.username)) {
      errors.username = 'Username harus 3-20 karakter alfanumerik tanpa simbol.';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!form.password.trim()) {
      errors.password = 'Password wajib diisi';
    } else if (!passwordRegex.test(form.password)) {
      errors.password =
        'Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol.';
    }
    if (!form.invitationCode.trim()) errors.invitationCode = 'Kode undangan wajib diisi';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    try {
      await api.post('/auth/register', {
        ...form,
        role: 'staff',
      });
      onSuccess(); // Kembali ke tab login
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-2 rounded-lg text-sm ${formError.name ? 'border-red-500' : 'border-gray-200'
            }`}
        />
        {formError.name && (
          <p className=" text-red-600 text-xs">{formError.name}</p>
        )}
      </div>


      <div className=''>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-2 rounded-lg text-sm ${formError.username ? 'border-red-500' : 'border-gray-200'
            }`}
        />
        {formError.username && (
          <p className=" text-red-600 text-xs">{formError.username}</p>
        )}
      </div>

      <div className="relative">
        <input
          name="password"
          type={show ? 'text' : 'password'}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-2 rounded-lg text-sm ${formError.password ? 'border-red-500' : 'border-gray-200'
            }`}

        />
        {formError.password && (
          <p className=" text-red-600 text-xs">{formError.password}</p>
        )}
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-2 right-3 text-gray-500 text-md"
        >
          {show ? '🙈' : '🙊'}
        </button>
      </div>

      <div className=''>
        <input
          name="invitationCode"
          placeholder="Invitation Code"
          value={form.invitationCode}
          onChange={handleChange}
          className={`w-full px-4 py-2 border-2 rounded-lg text-sm ${formError.invitationCode ? 'border-red-500' : 'border-gray-200'
            }`}
        />
        {formError.invitationCode && (
          <p className="text-red-600 text-xs">{formError.invitationCode}</p>
        )}
      </div>
      {error && <p className="text-red-600 text-xs">{error}</p>}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
        Sign Up
      </button>
    </form>
  );
}
