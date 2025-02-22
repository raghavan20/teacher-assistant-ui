import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate login success
    if (username && password) {
      if (username === 'pallavi') {
        localStorage.setItem('role', 'teacher');
        localStorage.setItem('name', 'Pallavi');
        localStorage.setItem('state', 'DEL');
        localStorage.setItem('district', 'New Delhi');
        localStorage.setItem('board', 'CBSE');
        localStorage.setItem('block', 'Saket');
        localStorage.setItem('userId', '1');
        localStorage.setItem('totalLessons', '103');
        localStorage.setItem('totalStars', '74');
        localStorage.setItem('streakDays', '23');
      }
      else if (username === 'meenakshi') {
        localStorage.setItem('role', 'teacher');
        localStorage.setItem('name', 'Meenakshi');
        localStorage.setItem('state', 'UP');
        localStorage.setItem('board', 'UPMSP');
        localStorage.setItem('district', 'Bijnor');
        localStorage.setItem('block', 'Dhampur');
        localStorage.setItem('userId', '2');
        localStorage.setItem('totalLessons', '87');
        localStorage.setItem('totalStars', '63');
        localStorage.setItem('streakDays', '7');
      }
      localStorage.setItem('username', username);
      navigate('/profile'); // Redirect to home page after login
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-transparent p-8 rounded-lg w-full max-w-md">
        <div className="text-center mb-2">
          <img src="./src/assets/logo.png" alt="Logo" className="mx-auto w-84 h-68" />
        </div>
        <form onSubmit={handleLogin} className="items-center justify-center">
          <div>
            <input
              type="text"
              id="username"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full my-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full my-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type="submit"
              className="w-1/2 mt-16 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}