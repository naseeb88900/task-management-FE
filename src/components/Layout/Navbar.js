import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/tasks" className="text-white text-lg font-bold">Task Manager</Link>
        <button onClick={handleLogout} className="text-white">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
