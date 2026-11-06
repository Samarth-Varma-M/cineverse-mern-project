import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Edit3, Trash2, Info } from 'lucide-react';

const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';

export const MovieCard = ({ movie, onToggleFav, onEdit, onDelete }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_POSTER;
  };

  return (
    <div className="movie-card">
      {/* Favourite Heart Button */}
      <button
        type="button"
        className={`card-fav-btn ${movie.isFavourite ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onToggleFav(movie);
        }}
        title={movie.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      >
        <Heart size={18} fill={movie.isFavourite ? 'currentColor' : 'none'} />
      </button>

      {/* Poster Image */}
      <div className="card-poster-wrapper">
        <img
          src={movie.poster || FALLBACK_POSTER}
          alt={movie.title}
          className="card-poster"
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      {/* Card Info */}
      <div className="card-content">
        <h3 className="card-title" title={movie.title}>
          {movie.title}
        </h3>

        <div className="card-meta">
          <span className="badge badge-genre">{movie.genre}</span>
          <span>{movie.releaseYear}</span>
          <div className="badge badge-rating">
            <Star size={12} fill="#fbbf24" />
            <span>{movie.rating ? Number(movie.rating).toFixed(1) : 'N/A'}</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="card-actions">
          <Link to={`/movies/${movie._id}`} className="btn btn-secondary btn-sm" title="View Details">
            <Info size={14} />
            <span>Details</span>
          </Link>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(movie)}
            title="Edit Movie"
          >
            <Edit3 size={14} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(movie)}
            title="Delete Movie"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
