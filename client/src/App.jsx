import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Catalog } from './pages/Catalog';
import { MovieDetails } from './pages/MovieDetails';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Film, Github, Heart } from 'lucide-react';

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

            {/* Footer */}
            <footer style={{
              background: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border-color)',
              padding: '36px 0 24px',
              marginTop: '60px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              <div className="container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Film size={18} color="var(--accent-primary)" />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>CineVerse</span>
                  <span>— MERN Stack Web Development Training Project</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Developed with</span>
                  <Heart size={14} fill="#ef4444" color="#ef4444" />
                  <span>by CineVerse Team</span>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ background: 'var(--bg-card)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    MongoDB
                  </span>
                  <span style={{ background: 'var(--bg-card)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    Express.js
                  </span>
                  <span style={{ background: 'var(--bg-card)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    React.js
                  </span>
                  <span style={{ background: 'var(--bg-card)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    Node.js
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}
