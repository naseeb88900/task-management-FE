import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api';
import { saveToken } from '../../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      saveToken(response.data.token); // Save token to localStorage
      navigate('/tasks'); // Redirect to tasks page
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4">
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
