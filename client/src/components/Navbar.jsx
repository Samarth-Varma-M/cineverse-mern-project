import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Film, Plus, BarChart2, Heart, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Navbar = ({ onOpenAddModal }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('You have logged out');
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand">
          <Film size={20} color="#f59e0b" />
          <span style={{ fontWeight: 800, letterSpacing: '0.5px' }}>
            CINE<span style={{ color: '#f59e0b' }}>VERSE</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <span>Movies</span>
          </NavLink>

          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>Analytics</span>
          </NavLink>

          {/* Quick Add Button */}
          <button
            onClick={onOpenAddModal}
            className="btn btn-primary btn-sm"
            style={{ marginLeft: '8px' }}
          >
            <Plus size={15} />
            <span>Add Title</span>
          </button>

          {/* User Auth Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-card)',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}>
                  <UserIcon size={13} color="#f59e0b" />
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{user?.name?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  title="Log out"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  <LogIn size={14} />
                  <span>Sign In</span>
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
