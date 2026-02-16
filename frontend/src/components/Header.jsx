import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_NAME } from '../utils/constants';

const Header = () => {
  // Navigation items
  const navItems = [
    { path: '/', label: 'All Tasks', icon: '📋' },
    { path: '/add', label: 'Add Task', icon: '➕' },
    { path: '/completed', label: 'Completed', icon: '✅' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl transform group-hover:rotate-12 transition-transform">
              📝
            </span>
            <span className="font-bold text-xl tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'hover:bg-blue-500 hover:shadow'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;