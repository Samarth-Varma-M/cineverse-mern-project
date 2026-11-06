import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Heart, RefreshCw, Film, SlidersHorizontal } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { MovieModal } from '../components/MovieModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../context/ToastContext';
import api from '../api/client';

const QUICK_GENRES = ['All', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Animation', 'Thriller', 'Biography', 'Adventure', 'Romance'];

export const Catalog = ({ isModalOpen, setIsModalOpen, editingMovie, setEditingMovie }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [likedOnly, setLikedOnly] = useState(false);

  // Delete modal state
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();
  const searchTimeoutRef = useRef(null);

  // Debounce search input for high performance
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(val);
    }, 250);
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (selectedGenre && selectedGenre !== 'All') params.genre = selectedGenre;
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
  }, [debouncedSearch, selectedGenre, likedOnly, sortBy]);

  // Handle Favourite Toggle with optimistic update
  const handleToggleFav = async (movie) => {
    const updatedStatus = !movie.isFavourite;
    setMovies((prev) =>
      prev.map((m) => (m._id === movie._id ? { ...m, isFavourite: updatedStatus } : m))
    );

    try {
      await api.patch(`/movies/${movie._id}/favourite`, { isFavourite: updatedStatus });
      toast.success(updatedStatus ? `Added to watchlist` : `Removed from watchlist`);
    } catch (err) {
      setMovies((prev) =>
        prev.map((m) => (m._id === movie._id ? { ...m, isFavourite: !updatedStatus } : m))
      );
      toast.error(`Failed to update watchlist: ${err.message}`);
    }
  };

  // Handle Save (Create or Update)
  const handleSaveMovie = async (movieData, id) => {
    if (id) {
      const { data } = await api.put(`/movies/${id}`, movieData);
      setMovies((prev) => prev.map((m) => (m._id === id ? data.data : m)));
      toast.success(`"${movieData.title}" updated`);
    } else {
      const { data } = await api.post('/movies', movieData);
      setMovies((prev) => [data.data, ...prev]);
      toast.success(`"${movieData.title}" added to catalog`);
    }
  };

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      setIsDeleting(true);
      await api.delete(`/movies/${deleteCandidate._id}`);
      setMovies((prev) => prev.filter((m) => m._id !== deleteCandidate._id));
      toast.success(`"${deleteCandidate.title}" removed`);
      setDeleteCandidate(null);
    } catch (err) {
      toast.error(`Failed to delete: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container">
      {/* Clean Header Bar */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '28px', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            Featured Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Browse curated cinema, stream ratings, and organize your personal watchlist.
          </p>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Showing <strong>{movies.length}</strong> titles
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="genre-pills-container">
        {QUICK_GENRES.map((g) => (
          <button
            key={g}
            type="button"
            className={`genre-pill ${selectedGenre === g ? 'active' : ''}`}
            onClick={() => setSelectedGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        {/* Search Input */}
        <div className="search-wrapper">
          <Search size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, director, or keyword..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Sort Select */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rating-desc">Highest Rated First</option>
          <option value="rating-asc">Lowest Rated First</option>
          <option value="year-desc">Newest Release First</option>
          <option value="year-asc">Oldest Release First</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>

        {/* Liked / Watchlist Filter */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={likedOnly}
            onChange={(e) => setLikedOnly(e.target.checked)}
          />
          <Heart size={14} fill={likedOnly ? '#ef4444' : 'none'} color="#ef4444" />
          <span>Watchlist Only</span>
        </label>

        {/* Refresh Button */}
        <button
          onClick={fetchMovies}
          className="btn btn-secondary btn-icon"
          title="Refresh Catalog"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '0.95rem' }}>Loading catalog...</p>
        </div>
      ) : movies.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '60px'
        }}>
          <Film size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h3>No Movies Found</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', margin: '6px auto 16px', fontSize: '0.9rem' }}>
            No titles match your current search or filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setDebouncedSearch('');
              setSelectedGenre('All');
              setLikedOnly(false);
            }}
            className="btn btn-secondary btn-sm"
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
        title="Remove Title"
        message={`Are you sure you want to remove "${deleteCandidate?.title}" from the catalog?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
        loading={isDeleting}
      />
    </div>
  );
};
