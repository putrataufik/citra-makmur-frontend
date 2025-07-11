import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthPage() {
    const [tab, setTab] = useState('login');

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EFE7DA] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h1 className="text-center text-xl font-bold mb-2">CITRA MAKMUR WAREHOUSE</h1>
                <h2 className="text-center text-2xl font-semibold mb-1">
                    {tab === 'login' ? 'Log in to your Account' : 'Create an Account'}
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    {tab === 'login'
                        ? 'Enter your username and password'
                        : 'Please fill the fields to sign up'}
                </p>

                <div className="flex mb-6 bg-gray-200 rounded-xl p-1">
                    <button
                        onClick={() => setTab('login')}
                        className={`flex-1 py-2 font-medium rounded-xl ${tab === 'login' ? 'bg-white ' : 'text-gray-400'
                            }`}
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => setTab('signup')}
                        className={`flex-1 py-2 font-medium rounded-xl ${tab === 'signup' ? 'bg-white' : 'text-gray-400'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="min-h-[420px] transition-all duration-1000">
                    {tab === 'login' ? (
                        <LoginForm />
                    ) : (
                        <SignUpForm onSuccess={() => setTab('login')} /> // ✅ ganti tab saat daftar berhasil
                    )}
                </div>
            </div>
        </div>
    );
}
