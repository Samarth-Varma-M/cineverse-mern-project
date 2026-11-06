import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Film,
  Star,
  Heart,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Globe,
  Award,
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
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Aggregating system statistics...</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* Title */}
      <div style={{ marginTop: '36px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>
          Platform <span className="gradient-text">Analytics & Insights</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Real-time database metrics, genre breakdowns, and highest-rated titles across the CineVerse catalog.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Film size={26} />
          </div>
          <div>
            <div className="stat-value">{stats.totalMovies}</div>
            <div className="stat-label">Total Movies</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Star size={26} fill="#fbbf24" />
          </div>
          <div>
            <div className="stat-value">{stats.averageRating} / 10</div>
            <div className="stat-label">Average Catalog Rating</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
            <Heart size={26} fill="#f87171" />
          </div>
          <div>
            <div className="stat-value">{stats.totalFavourites}</div>
            <div className="stat-label">Watchlist Favourites</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <MessageSquare size={26} />
          </div>
          <div>
            <div className="stat-value">{stats.totalReviews}</div>
            <div className="stat-label">Audience Reviews</div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {/* Genre Breakdown */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <BarChart3 size={20} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem' }}>Genre Distribution</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stats.genreDistribution.map((item) => {
              const percentage = Math.round((item.count / (stats.totalMovies || 1)) * 100);
              return (
                <div key={item.genre}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600 }}>{item.genre}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.count} titles ({percentage}%)</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'var(--bg-card)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${percentage}%`,
                      height: '100%',
                      background: 'var(--accent-gradient)',
                      borderRadius: '4px'
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
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Award size={20} color="#fbbf24" />
            <h2 style={{ fontSize: '1.25rem' }}>Top Rated Movies</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {stats.topRatedMovies.map((movie, index) => (
              <Link
                key={movie._id}
                to={`/movies/${movie._id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: index === 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: index === 0 ? '#fbbf24' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}>
                  #{index + 1}
                </div>

                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{ width: '40px', height: '56px', objectFit: 'cover', borderRadius: '4px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=120&q=80';
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {movie.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {movie.genre} • {movie.releaseYear}
                  </div>
                </div>

                <div className="badge badge-rating">
                  <Star size={12} fill="#fbbf24" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Language Breakdown Banner */}
      <div style={{
        marginTop: '28px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe size={22} color="var(--accent-primary)" />
          <strong style={{ fontSize: '1rem' }}>Language Diversity:</strong>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {stats.languageDistribution.map((l) => (
            <span
              key={l.language}
              style={{
                background: 'var(--bg-card)',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem',
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

