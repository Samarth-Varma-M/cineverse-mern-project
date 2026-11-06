const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Get dashboard statistics & analytics
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res, next) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalFavourites = await Movie.countDocuments({ isFavourite: true });

    // Average rating
    const ratingAggregation = await Movie.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);
    const averageRating = ratingAggregation.length > 0
      ? Number(ratingAggregation[0].avgRating.toFixed(1))
      : 0;

    // Genre distribution
    const genreDistribution = await Movie.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Top rated movies
    const topRatedMovies = await Movie.find({})
      .sort({ rating: -1 })
      .limit(5)
      .select('title rating genre releaseYear poster');

    // Language breakdown
    const languageDistribution = await Movie.aggregate([
      { $group: { _id: '$language', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalMovies,
        totalReviews,
        totalUsers,
        totalFavourites,
        averageRating,
        genreDistribution: genreDistribution.map((g) => ({
          genre: g._id || 'Unknown',
          count: g.count,
        })),
        languageDistribution: languageDistribution.map((l) => ({
          language: l._id || 'Unknown',
          count: l.count,
        })),
        topRatedMovies,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };
