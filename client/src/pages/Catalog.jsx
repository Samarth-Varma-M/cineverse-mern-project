import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, Sparkles, RefreshCw, Film } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { MovieModal } from '../components/MovieModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';
import api from '../api/client';

export const Catalog = ({ isModalOpen, setIsModalOpen, editingMovie, setEditingMovie }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('year-desc');
  const [likedOnly, setLikedOnly] = useState(false);

  // Delete modal state
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (selectedGenre) params.genre = selectedGenre;
      if (likedOnly) params.isFavourite = 'true';
      if (sortBy) params.sort = sortBy;

      const { data } = await api.get('/movies', { params });
      setMovies(data.data || []);
    } catch (err) {
      toast.error(`Error loading movies: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, selectedGenre, likedOnly, sortBy]);

  // Extract unique genres for the dropdown
  const genres = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => {
      if (m.genre) set.add(m.genre);
    });
    return Array.from(set).sort();
  }, [movies]);

  // Handle Favourite Toggle with optimistic update
  const handleToggleFav = async (movie) => {
    const updatedStatus = !movie.isFavourite;
    // Optimistic UI update
    setMovies((prev) =>
      prev.map((m) => (m._id === movie._id ? { ...m, isFavourite: updatedStatus } : m))
    );

    try {
      await api.patch(`/movies/${movie._id}/favourite`, { isFavourite: updatedStatus });
      toast.success(updatedStatus ? `Added "${movie.title}" to favourites ❤️` : `Removed "${movie.title}" from favourites`);
    } catch (err) {
      // Revert on failure
      setMovies((prev) =>
        prev.map((m) => (m._id === movie._id ? { ...m, isFavourite: !updatedStatus } : m))
      );
      toast.error(`Failed to update favourite: ${err.message}`);
    }
  };

  // Handle Save (Create or Update)
  const handleSaveMovie = async (movieData, id) => {
    if (id) {
      // Update
      const { data } = await api.put(`/movies/${id}`, movieData);
      setMovies((prev) => prev.map((m) => (m._id === id ? data.data : m)));
      toast.success(`Movie "${movieData.title}" updated successfully!`);
    } else {
      // Create
      const { data } = await api.post('/movies', movieData);
      setMovies((prev) => [data.data, ...prev]);
      toast.success(`Movie "${movieData.title}" added to catalog!`);
    }
  };

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      setIsDeleting(true);
      await api.delete(`/movies/${deleteCandidate._id}`);
      setMovies((prev) => prev.filter((m) => m._id !== deleteCandidate._id));
      toast.success(`"${deleteCandidate.title}" was deleted`);
      setDeleteCandidate(null);
    } catch (err) {
      toast.error(`Failed to delete: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container">
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginTop: '36px', marginBottom: '16px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: '999px',
          color: '#a5b4fc',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '16px'
        }}>
          <Sparkles size={14} />
          <span>Full-Stack MERN Movie Platform</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Explore, Discover & Manage <span className="gradient-text">Cinema</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem' }}>
          A full-stack movie management system built with MongoDB, Express.js, React, and Node.js.
          Manage titles, toggle watchlists, analyze ratings, and submit reviews.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        {/* Search Input */}
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, genre, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Genre Filter */}
        <select
          className="filter-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* Sort Select */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="year-desc">Newest Release First</option>
          <option value="year-asc">Oldest Release First</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>

        {/* Liked / Favourites Filter */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={likedOnly}
            onChange={(e) => setLikedOnly(e.target.checked)}
          />
          <Heart size={16} fill={likedOnly ? '#ef4444' : 'none'} color="#ef4444" />
          <span>Favourites Only</span>
        </label>

        {/* Refresh Button */}
        <button
          onClick={fetchMovies}
          className="btn btn-secondary btn-icon"
          title="Refresh Catalog"
        >
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
        </button>
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
          <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
          <p>Loading movie catalog...</p>
        </div>
      ) : movies.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          marginBottom: '60px'
        }}>
          <Film size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
          <h3>No Movies Found</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '8px auto 20px' }}>
            We couldn't find any movies matching your current search or filters. Try adjusting your query or add a new movie.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedGenre('');
              setLikedOnly(false);
            }}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onToggleFav={handleToggleFav}
              onEdit={(m) => {
                setEditingMovie(m);
                setIsModalOpen(true);
              }}
              onDelete={(m) => setDeleteCandidate(m)}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <MovieModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMovie(null);
        }}
        onSave={handleSaveMovie}
        movie={editingMovie}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteCandidate}
        title="Delete Movie"
        message={`Are you sure you want to delete "${deleteCandidate?.title}"? All associated reviews will also be removed.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
        loading={isDeleting}
      />
    </div>
  );
};

