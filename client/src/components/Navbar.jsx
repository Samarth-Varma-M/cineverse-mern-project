import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Film, Plus, BarChart3, Heart, LogIn, LogOut, User as UserIcon } from 'lucide-react';
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
          <div style={{
            background: 'var(--accent-gradient)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <Film size={22} />
          </div>
          <span>Cine<span className="gradient-text">Verse</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <Film size={18} />
            <span>Catalog</span>
          </NavLink>

          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <BarChart3 size={18} />
            <span>Analytics</span>
          </NavLink>

          {/* Quick Add Button */}
          <button
            onClick={onOpenAddModal}
            className="btn btn-primary btn-sm"
            style={{ marginLeft: '6px' }}
          >
            <Plus size={16} />
            <span>Add Movie</span>
          </button>

          {/* User Auth Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-card)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem'
                }}>
                  <UserIcon size={14} color="#a5b4fc" />
                  <span style={{ fontWeight: 600 }}>{user?.name?.split(' ')[0]}</span>
                  {user?.role === 'admin' && (
                    <span style={{
                      fontSize: '0.65rem',
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: '#a5b4fc',
                      padding: '2px 5px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      fontWeight: 700
                    }}>Admin</span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  title="Log out"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
