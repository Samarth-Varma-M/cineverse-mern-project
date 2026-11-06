import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Catalog } from './pages/Catalog';
import { MovieDetails } from './pages/MovieDetails';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Film } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleOpenAddModal = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar onOpenAddModal={handleOpenAddModal} />

            <main style={{ flex: 1 }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Catalog
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      editingMovie={editingMovie}
                      setEditingMovie={setEditingMovie}
                    />
                  }
                />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Clean Consumer Footer */}
            <footer style={{
              background: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border-color)',
              padding: '28px 0 24px',
              marginTop: '48px',
              fontSize: '0.825rem',
              color: 'var(--text-muted)'
            }}>
              <div className="container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Film size={16} color="#f59e0b" />
                  <span style={{ fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px' }}>
                    CINE<span style={{ color: '#f59e0b' }}>VERSE</span>
                  </span>
                  <span style={{ margin: '0 4px' }}>•</span>
                  <span>Discover, track, and review great cinema worldwide.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Link to="/" style={{ color: 'var(--text-secondary)' }}>Catalog</Link>
                  <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Analytics</Link>
                  <span>© 2026 CineVerse</span>
                </div>
              </div>
            </footer>
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}
