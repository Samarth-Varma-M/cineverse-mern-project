import { MovieService } from './service/movieService.js';
import { ErrorHandler } from '../exception/errorHandler.js';
import { formatDuration } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('No movie ID provided.');
    window.location.href = 'index.html';
    return;
  }

  fetchAndRenderDetails(id);
});

async function fetchAndRenderDetails(id) {
  const [error, movie] = await ErrorHandler.asyncWrapper(MovieService.getMovieById(id));
  
  const loading = document.getElementById('loadingIndicator');
  const container = document.getElementById('detailsContainer');

  loading.style.display = 'none';

  if (error) {
    ErrorHandler.handle(error);
    container.innerHTML = '<h3>Failed to load movie details.</h3>';
    container.style.display = 'block';
    return;
  }

  if (movie) {
    document.getElementById('detPoster').src = movie.poster;
    document.getElementById('detTitle').textContent = movie.title;
    document.getElementById('detGenre').textContent = `🎭 ${movie.genre}`;
    document.getElementById('detLanguage').textContent = `🗣 ${movie.language}`;
    document.getElementById('detYear').textContent = `📅 ${movie.releaseYear}`;
    document.getElementById('detDuration').textContent = `⏱ ${formatDuration(movie.duration)}`;
    document.getElementById('detRating').textContent = `⭐ ${movie.rating} / 10`;
    document.getElementById('detDescription').textContent = movie.description;

    container.style.display = 'flex';
    document.title = `${movie.title} - MMS`;
  }
}
