const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleFavourite,
} = require('../controllers/movieController');
const {
  addReview,
  getMovieReviews,
} = require('../controllers/reviewController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMovies)
  .post(optionalAuth, createMovie);

router.route('/:id')
  .get(getMovieById)
  .put(optionalAuth, updateMovie)
  .delete(optionalAuth, deleteMovie);

router.route('/:id/favourite')
  .patch(toggleFavourite);

// Nested reviews endpoints
router.route('/:id/reviews')
  .get(getMovieReviews)
  .post(optionalAuth, addReview);

module.exports = router;
