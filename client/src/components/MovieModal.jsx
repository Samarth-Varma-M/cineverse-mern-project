import React, { useState, useEffect } from 'react';
import { X, Film, Check, AlertCircle } from 'lucide-react';

const GENRE_LIST = [
  'Action',
  'Sci-Fi',
  'Drama',
  'Thriller',
  'Comedy',
  'Crime',
  'Adventure',
  'Animation',
  'Biography',
  'Horror',
  'Fantasy',
  'Romance',
  'Mystery',
];

export const MovieModal = ({ isOpen, onClose, onSave, movie }) => {
  const isEditing = !!movie;

  const [formData, setFormData] = useState({
    title: '',
    genre: 'Drama',
    language: 'English',
    releaseYear: new Date().getFullYear(),
    rating: 7.5,
    duration: 120,
    poster: '',
    description: '',
    director: '',
    isFavourite: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        genre: movie.genre || 'Drama',
        language: movie.language || 'English',
        releaseYear: movie.releaseYear || new Date().getFullYear(),
        rating: movie.rating !== undefined ? movie.rating : 7.5,
        duration: movie.duration || 120,
        poster: movie.poster || '',
        description: movie.description || '',
        director: movie.director || '',
        isFavourite: !!movie.isFavourite,
      });
    } else {
      setFormData({
        title: '',
        genre: 'Drama',
        language: 'English',
        releaseYear: new Date().getFullYear(),
        rating: 7.5,
        duration: 120,
        poster: '',
        description: '',
        director: '',
        isFavourite: false,
      });
    }
    setErrors({});
  }, [movie, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Movie title is required';
    if (!formData.genre.trim()) errs.genre = 'Genre is required';
    if (!formData.releaseYear || isNaN(formData.releaseYear)) {
      errs.releaseYear = 'Valid year is required';
    } else if (formData.releaseYear < 1888 || formData.releaseYear > 2035) {
      errs.releaseYear = 'Year must be between 1888 and 2035';
    }
    if (formData.rating < 0 || formData.rating > 10) {
      errs.rating = 'Rating must be between 0 and 10';
    }
    if (formData.duration <= 0) {
      errs.duration = 'Duration must be positive';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSave(formData, movie?._id);
      onClose();
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Film size={20} color="var(--accent-primary)" />
            <h2>{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {errors.submit && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: '#fda4af',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={18} />
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Movie Title *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Inception"
              required
            />
            {errors.title && <span style={{ color: 'var(--danger-color)', fontSize: '0.8rem' }}>{errors.title}</span>}
          </div>

          {/* Genre and Language */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Genre *</label>
              <select
                className="form-select"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              >
                {GENRE_LIST.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Language</label>
              <input
                type="text"
                className="form-input"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="e.g. English, Hindi, French"
              />
            </div>
          </div>

          {/* Year, Rating, Duration */}
          <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className="form-group">
              <label className="form-label">Year *</label>
              <input
                type="number"
                className="form-input"
                value={formData.releaseYear}
                onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value, 10) || '' })}
                min="1888"
                max="2035"
                required
              />
              {errors.releaseYear && <span style={{ color: 'var(--danger-color)', fontSize: '0.8rem' }}>{errors.releaseYear}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Rating (0-10)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                min="0"
                max="10"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Duration (mins)</label>
              <input
                type="number"
                className="form-input"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value, 10) || 0 })}
                min="1"
              />
            </div>
          </div>

          {/* Poster Image URL */}
          <div className="form-group">
            <label className="form-label">Poster Image URL</label>
            <input
              type="url"
              className="form-input"
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          {/* Director */}
          <div className="form-group">
            <label className="form-label">Director</label>
            <input
              type="text"
              className="form-input"
              value={formData.director}
              onChange={(e) => setFormData({ ...formData, director: e.target.value })}
              placeholder="e.g. Christopher Nolan"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Synopsis / Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a brief synopsis of the movie..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Check size={16} />
              <span>{submitting ? 'Saving...' : isEditing ? 'Update Movie' : 'Create Movie'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
