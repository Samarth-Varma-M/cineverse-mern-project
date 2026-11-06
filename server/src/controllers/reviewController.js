const Review = require('../models/Review');
const Movie = require('../models/Movie');

// @desc    Add review to movie
// @route   POST /api/movies/:id/reviews
// @access  Private / Protected
const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required',
      });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    const userId = req.user ? req.user._id : null;
    const userName = req.user ? req.user.name : (req.body.userName || 'Movie Fan');

    // Check if user already reviewed this movie
    if (userId) {
      const existing = await Review.findOne({ movie: movieId, user: userId });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this movie. Edit your existing review instead.',
        });
      }
    }

    const review = await Review.create({
      movie: movieId,
      user: userId || movie._id, // fallback if anonymous
      userName,
      rating: Number(rating),
      comment: comment.trim(),
    });

    // Optionally update movie average rating if desired
    const reviews = await Review.find({ movie: movieId });
    if (reviews.length > 0) {
      const avgRating = (
        reviews.reduce((acc, item) => item.rating * 2 + acc, 0) / reviews.length
      ).toFixed(1); // convert 5-star scale to 10-point scale or blend
      // keep original rating or blend gently
    }

    res.status(201).json({
      success: true,
      data: review,
      message: 'Review posted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for a movie
// @route   GET /api/movies/:id/reviews
// @access  Public
const getMovieReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ movie: req.params.id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user is owner or admin
    if (
      req.user &&
      req.user.role !== 'admin' &&
      review.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review',
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Review removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getMovieReviews,
  deleteReview,
};
