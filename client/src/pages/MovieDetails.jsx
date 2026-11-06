import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  Calendar,
  Globe,
  Film,
  User,
  Edit3,
  Trash2,
  MessageSquare,
  Send,
} from 'lucide-react';
import { MovieModal } from '../components/MovieModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit / Delete modals
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // New review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const [movieRes, reviewRes] = await Promise.all([
        api.get(`/movies/${id}`),
        api.get(`/movies/${id}/reviews`),
      ]);
      setMovie(movieRes.data.data);
      setReviews(reviewRes.data.data || []);
    } catch (err) {
      toast.error(`Error loading movie: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const handleToggleFav = async () => {
    if (!movie) return;
    const nextStatus = !movie.isFavourite;
    setMovie((prev) => ({ ...prev, isFavourite: nextStatus }));

    try {
      await api.patch(`/movies/${movie._id}/favourite`, { isFavourite: nextStatus });
      toast.success(nextStatus ? 'Added to favourites ❤️' : 'Removed from favourites');
    } catch (err) {
      setMovie((prev) => ({ ...prev, isFavourite: !nextStatus }));
      toast.error('Failed to toggle favourite');
    }
  };

  const handleUpdateMovie = async (updatedData) => {
    const { data } = await api.put(`/movies/${id}`, updatedData);
    setMovie(data.data);
    toast.success('Movie updated successfully!');
  };

  const handleDeleteMovie = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/movies/${id}`);
      toast.success('Movie deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    try {
      setSubmittingReview(true);
      const { data } = await api.post(`/movies/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewComment,
        userName: user?.name || reviewerName || 'Movie Fan',
      });
      setReviews((prev) => [data.data, ...prev]);
      setReviewComment('');
      toast.success('Review posted successfully! ⭐');
    } catch (err) {
      toast.error(`Could not submit review: ${err.message}`);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success('Review removed');
    } catch (err) {
      toast.error(`Failed to delete review: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Movie Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>
          The movie you are looking for does not exist or was removed.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Back button */}
      <div style={{ marginTop: '28px', marginBottom: '16px' }}>
        <Link to="/" className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Details Hero Section */}
      <div className="details-hero">
        <div style={{ position: 'relative' }}>
          <img
            src={movie.poster || FALLBACK_POSTER}
            alt={movie.title}
            className="details-poster"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_POSTER;
            }}
          />
          <button
            type="button"
            className={`card-fav-btn ${movie.isFavourite ? 'active' : ''}`}
            onClick={handleToggleFav}
            style={{ top: '16px', right: '16px' }}
          >
            <Heart size={20} fill={movie.isFavourite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="details-info">
          <h1>{movie.title}</h1>

          {/* Badges metadata */}
          <div className="details-badges">
            <span className="badge badge-genre">{movie.genre}</span>
            <div className="badge badge-rating">
              <Star size={14} fill="#fbbf24" />
              <span>{movie.rating ? Number(movie.rating).toFixed(1) : 'N/A'} / 10</span>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Calendar size={15} />
              <span>{movie.releaseYear}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Clock size={15} />
              <span>{movie.duration} min ({Math.floor(movie.duration / 60)}h {movie.duration % 60}m)</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Globe size={15} />
              <span>{movie.language || 'English'}</span>
            </span>
          </div>

          {/* Director */}
          {movie.director && (
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Director:</strong> {movie.director}
            </p>
          )}

          {/* Synopsis */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Synopsis</h3>
            <p className="details-plot">{movie.description || 'No detailed synopsis provided.'}</p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsEditOpen(true)}
              className="btn btn-secondary"
            >
              <Edit3 size={16} />
              <span>Edit Details</span>
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="btn btn-danger"
            >
              <Trash2 size={16} />
              <span>Delete Movie</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews & Community Feedback Section */}
      <div className="reviews-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={22} color="var(--accent-primary)" />
            <h2>Audience Reviews & Ratings ({reviews.length})</h2>
          </div>
        </div>

        {/* Add Review Box */}
        <form onSubmit={handleAddReview} style={{
          background: 'var(--bg-card)',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '28px'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '14px' }}>Leave a Review</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <div>
              <label className="form-label">Your Rating (1 to 5 Stars):</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: star <= reviewRating ? '#f59e0b' : 'var(--text-muted)',
                      padding: '2px',
                    }}
                  >
                    <Star size={24} fill={star <= reviewRating ? '#f59e0b' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            {!isAuthenticated && (
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label">Your Name (optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex M."
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <textarea
              className="form-textarea"
              placeholder="What did you think of the direction, screenplay, acting, or soundtrack?"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary btn-sm" disabled={submittingReview}>
              <Send size={15} />
              <span>{submittingReview ? 'Posting...' : 'Post Review'}</span>
            </button>
          </div>
        </form>

        {/* Review list */}
        {reviews.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '24px 0' }}>
            No reviews yet. Be the first to share your thoughts on this movie!
          </p>
        ) : (
          <div>
            {reviews.map((rev) => (
              <div key={rev._id} className="review-card">
                <div className="review-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: '#a5b4fc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}>
                      {(rev.userName || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.925rem' }}>{rev.userName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" />
                      ))}
                    </div>

                    {(user?.role === 'admin' || user?._id === rev.user) && (
                      <button
                        onClick={() => handleDeleteReview(rev._id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                        title="Delete Review"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <MovieModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleUpdateMovie}
        movie={movie}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Movie"
        message={`Are you sure you want to delete "${movie.title}"? This cannot be undone.`}
        onConfirm={handleDeleteMovie}
        onCancel={() => setIsDeleteOpen(false)}
        loading={isDeleting}
      />
    </div>
  );
};

