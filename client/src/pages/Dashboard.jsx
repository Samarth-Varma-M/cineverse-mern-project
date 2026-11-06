import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Film,
  Star,
  Heart,
  MessageSquare,
  BarChart3,
  Award,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import api from '../api/client';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/stats');
      setStats(data.data);
    } catch (err) {
      toast.error(`Failed to load stats: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading catalog analytics...</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* Title */}
      <div style={{ marginTop: '32px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>
          Catalog Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Real-time metrics, genre breakdowns, and highest-rated titles across the CineVerse catalog.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Film size={22} color="#f59e0b" />
          </div>
          <div>
            <div className="stat-value">{stats.totalMovies}</div>
            <div className="stat-label">Total Titles</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star size={22} fill="#f59e0b" color="#f59e0b" />
          </div>
          <div>
            <div className="stat-value">{stats.averageRating} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 10</span></div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Heart size={22} fill="#ef4444" color="#ef4444" />
          </div>
          <div>
            <div className="stat-value">{stats.totalFavourites}</div>
            <div className="stat-label">In Watchlists</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MessageSquare size={22} color="#ffffff" />
          </div>
          <div>
            <div className="stat-value">{stats.totalReviews}</div>
            <div className="stat-label">Member Reviews</div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Genre Breakdown */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <BarChart3 size={18} color="#f59e0b" />
            <h2 style={{ fontSize: '1.15rem' }}>Genre Distribution</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {stats.genreDistribution.map((item) => {
              const percentage = Math.round((item.count / (stats.totalMovies || 1)) * 100);
              return (
                <div key={item.genre}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600 }}>{item.genre}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.count} ({percentage}%)</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'var(--bg-input)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${percentage}%`,
                      height: '100%',
                      background: '#ffffff',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Rated Leaderboard */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Award size={18} color="#f59e0b" />
            <h2 style={{ fontSize: '1.15rem' }}>Highest Rated Titles</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats.topRatedMovies.map((movie, index) => (
              <Link
                key={movie._id}
                to={`/movies/${movie._id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: index === 0 ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.08)',
                  color: index === 0 ? '#000000' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}>
                  {index + 1}
                </div>

                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: '36px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=120&q=80';
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {movie.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {movie.genre} • {movie.releaseYear}
                  </div>
                </div>

                <div className="badge badge-rating">
                  <Star size={11} fill="#f59e0b" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Language Breakdown */}
      <div style={{
        marginTop: '24px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={18} color="#f59e0b" />
          <strong style={{ fontSize: '0.9rem' }}>Languages:</strong>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {stats.languageDistribution.map((l) => (
            <span
              key={l.language}
              style={{
                background: 'var(--bg-card)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}
            >
              {l.language}: <strong style={{ color: 'var(--text-primary)' }}>{l.count}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
