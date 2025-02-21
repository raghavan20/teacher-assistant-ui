import React, { useState } from 'react';
import { Menu, X, CircleUser } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ pageTitle }: { pageTitle: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMenu}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors mr-4"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CircleUser size={32} />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-white z-10 flex flex-col items-center justify-center p-4">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
          <ul className="space-y-4 text-center w-full">
          <li>
              <Link to="/record" className="block text-4xl font-bold text-blue-500 hover:underline py-4">
                Start New Lesson
              </Link>
            </li>
            <li>
              <Link to="/" className="block text-2xl text-black-500 hover:underline py-4">
                Home
              </Link>
            </li>
            <li>
              <Link to="/recordings" className="block text-2xl text-black-500 hover:underline py-4">
                Past Lessons
              </Link>
            </li>
            <li>
              <Link to="/settings" className="block text-2xl text-black-500 hover:underline py-4">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/help" className="block text-2xl text-black-500 hover:underline py-4">
                Help
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}