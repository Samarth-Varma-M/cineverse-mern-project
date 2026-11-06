import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '120px 20px' }}>
      <div style={{
        display: 'inline-flex',
        padding: '20px',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '50%',
        color: 'var(--accent-primary)',
        marginBottom: '20px'
      }}>
        <Film size={48} />
      </div>
      <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>404</h1>
      <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
        Scene Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 28px' }}>
        The reel you're looking for seems to have ended or doesn't exist on CineVerse.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={16} />
        <span>Return to Home Catalog</span>
      </Link>
    </div>
  );
};

