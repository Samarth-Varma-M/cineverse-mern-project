import { MovieService } from './service/movieService.js';
import { ErrorHandler } from '../exception/errorHandler.js';
import { ValidationException } from '../exception/validationException.js';
import { DOMUtils } from './utils.js';

let moviesData = [];

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  await fetchAndRenderMovies();
  setupEventListeners();
}

async function fetchAndRenderMovies() {
  const [error, movies] = await ErrorHandler.asyncWrapper(MovieService.getAllMovies());
  if (error) {
    ErrorHandler.handle(error);
    return;
  }
  moviesData = movies;
  renderMovies(moviesData);
  populateGenreFilter(moviesData);
}

function renderMovies(movies) {
  const grid = document.getElementById('movieGrid');
  DOMUtils.clearContainer(grid);

  if (movies.length === 0) {
    grid.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const card = DOMUtils.createElement('div', 'movie-card');
    
    // Heart Icon SVG
    const heartSvg = movie.isFavourite 
      ? `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>`
      : `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.171C12.72-3.042 23.333 4.867 8 15z"/></svg>`;

    card.innerHTML = `
      <button type="button" class="fav-btn ${movie.isFavourite ? 'active' : ''}" data-id="${movie.id}" data-fav="${movie.isFavourite}">
        ${heartSvg}
      </button>
      <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-meta">
          <span>${movie.releaseYear}</span>
          <span>⭐ ${movie.rating}</span>
        </div>
        <div class="movie-actions">
          <a href="details.html?id=${movie.id}" class="btn btn-secondary">Details</a>
          <button type="button" class="btn btn-secondary edit-btn" data-id="${movie.id}">Edit</button>
          <button type="button" class="btn btn-danger delete-btn" data-id="${movie.id}">Delete</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setupEventListeners() {
  document.getElementById('searchInput').addEventListener('input', handleFilterAndSort);
  document.getElementById('genreFilter').addEventListener('change', handleFilterAndSort);
  document.getElementById('sortSelect').addEventListener('change', handleFilterAndSort);
  document.getElementById('likedFilter').addEventListener('change', handleFilterAndSort);
  
  document.getElementById('addMovieBtn').addEventListener('click', () => openModal());
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  document.getElementById('movieForm').addEventListener('submit', handleFormSubmit);

  document.getElementById('movieGrid').addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.edit-btn');
    const deleteBtn = e.target.closest('.delete-btn');
    const favBtn = e.target.closest('.fav-btn');

    if (editBtn) {
      e.preventDefault();
      const id = editBtn.getAttribute('data-id');
      const movie = moviesData.find(m => m.id === id);
      if (movie) openModal(movie);
    } else if (deleteBtn) {
      e.preventDefault();
      const id = deleteBtn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this movie?')) {
        // Optimistic update
        moviesData = moviesData.filter(m => m.id !== id);
        handleFilterAndSort();
        
        const [error] = await ErrorHandler.asyncWrapper(MovieService.deleteMovie(id));
        if (error) {
          ErrorHandler.handle(error);
          fetchAndRenderMovies(); // rollback on error
        }
      }
    } else if (favBtn) {
      e.preventDefault();
      const id = favBtn.getAttribute('data-id');
      const isFav = favBtn.getAttribute('data-fav') === 'true';
      
      // Optimistic update
      const movie = moviesData.find(m => m.id === id);
      if (movie) {
        movie.isFavourite = !isFav;
        handleFilterAndSort();
      }

      const [error] = await ErrorHandler.asyncWrapper(MovieService.toggleFavourite(id, isFav));
      if (error) {
        ErrorHandler.handle(error);
        if (movie) {
          movie.isFavourite = isFav; // rollback
          handleFilterAndSort();
        }
      }
    }
  });
}

function handleFilterAndSort() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const genre = document.getElementById('genreFilter').value;
  const sort = document.getElementById('sortSelect').value;
  const likedOnly = document.getElementById('likedFilter').checked;

  const filtered = moviesData.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
    const matchesGenre = genre ? movie.genre === genre : true;
    const matchesLiked = likedOnly ? movie.isFavourite : true;
    return matchesSearch && matchesGenre && matchesLiked;
  });

  if (sort === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'rating-asc') {
    filtered.sort((a, b) => a.rating - b.rating);
  } else if (sort === 'year-desc') {
    filtered.sort((a, b) => b.releaseYear - a.releaseYear);
  } else if (sort === 'language-asc') {
    filtered.sort((a, b) => (a.language || '').localeCompare(b.language || ''));
  } else if (sort === 'language-desc') {
    filtered.sort((a, b) => (b.language || '').localeCompare(a.language || ''));
  }

  renderMovies(filtered);
}

function populateGenreFilter(movies) {
  const select = document.getElementById('genreFilter');
  const genres = [...new Set(movies.map(m => m.genre))].filter(Boolean);
  
  // Keep the first default option and remove others
  select.innerHTML = '<option value="">All Genres</option>';
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

// Form & Modal Logic
let editingMovieId = null;

function openModal(movie = null) {
  const modal = document.getElementById('movieModal');
  const form = document.getElementById('movieForm');
  const title = document.getElementById('modalTitle');

  if (movie) {
    editingMovieId = movie.id;
    title.textContent = 'Edit Movie';
    document.getElementById('title').value = movie.title;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('language').value = movie.language;
    document.getElementById('releaseYear').value = movie.releaseYear;
    document.getElementById('rating').value = movie.rating;
    document.getElementById('duration').value = movie.duration;
    document.getElementById('poster').value = movie.poster;
    document.getElementById('description').value = movie.description;
  } else {
    editingMovieId = null;
    title.textContent = 'Add Movie';
    form.reset();
  }

  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('movieModal').classList.remove('open');
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  try {
    const formData = {
      title: document.getElementById('title').value.trim(),
      genre: document.getElementById('genre').value.trim(),
      language: document.getElementById('language').value.trim(),
      releaseYear: parseInt(document.getElementById('releaseYear').value, 10),
      rating: parseFloat(document.getElementById('rating').value),
      duration: parseInt(document.getElementById('duration').value, 10),
      poster: document.getElementById('poster').value.trim(),
      description: document.getElementById('description').value.trim(),
      isFavourite: false
    };

    // Basic Validation via Exception
    const invalidFields = [];
    if (!formData.title) invalidFields.push('title');
    if (!formData.genre) invalidFields.push('genre');
    if (isNaN(formData.releaseYear)) invalidFields.push('releaseYear');
    
    if (invalidFields.length > 0) {
      throw new ValidationException('Please fill in all required fields correctly.', invalidFields);
    }

    if (editingMovieId) {
      // Keep existing favourite status
      const existing = moviesData.find(m => m.id === editingMovieId);
      if (existing) formData.isFavourite = existing.isFavourite;
      
      const [err, updatedMovie] = await ErrorHandler.asyncWrapper(MovieService.updateMovie(editingMovieId, formData));
      if (err) throw err;
      
      const index = moviesData.findIndex(m => m.id === editingMovieId);
      if (index !== -1) moviesData[index] = updatedMovie;
    } else {
      const [err, newMovie] = await ErrorHandler.asyncWrapper(MovieService.createMovie(formData));
      if (err) throw err;
      moviesData.push(newMovie);
    }

    closeModal();
    handleFilterAndSort();
    
  } catch (error) {
    ErrorHandler.handle(error);
  }
}
