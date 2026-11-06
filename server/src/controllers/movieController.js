const Movie = require('../models/Movie');
const Review = require('../models/Review');

// @desc    Get all movies with filtering, search, and sorting
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res, next) => {
  try {
    const { search, genre, language, isFavourite, sort } = req.query;

    const query = {};

    // Search query (matches title or description or genre)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { genre: searchRegex },
      ];
    }

    // Genre filter
    if (genre && genre !== 'All' && genre !== '') {
      query.genre = genre;
    }

    // Language filter
    if (language && language !== 'All' && language !== '') {
      query.language = language;
    }

    // Liked / Favourite filter
    if (isFavourite === 'true') {
      query.isFavourite = true;
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default: newest added
    if (sort === 'rating-desc') {
      sortOption = { rating: -1 };
    } else if (sort === 'rating-asc') {
      sortOption = { rating: 1 };
    } else if (sort === 'year-desc') {
      sortOption = { releaseYear: -1 };
    } else if (sort === 'year-asc') {
      sortOption = { releaseYear: 1 };
    } else if (sort === 'title-asc') {
      sortOption = { title: 1 };
    } else if (sort === 'title-desc') {
      sortOption = { title: -1 };
    }

    const movies = await Movie.find(query).sort(sortOption);

    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single movie by ID (with populated reviews)
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('reviews');

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new movie
// @route   POST /api/movies
// @access  Public / Protected (supports guest fallback)
const createMovie = async (req, res, next) => {
  try {
    const {
      title,
      genre,
      language,
      releaseYear,
      rating,
      duration,
      description,
      poster,
      director,
      isFavourite,
    } = req.body;

    if (!title || !genre || !releaseYear) {
      return res.status(400).json({
        success: false,
        message: 'Title, genre, and release year are required fields',
      });
    }

    const movie = await Movie.create({
      title: title.trim(),
      genre: genre.trim(),
      language: language ? language.trim() : 'English',
      releaseYear: Number(releaseYear),
      rating: rating !== undefined ? Number(rating) : 0,
      duration: duration ? Number(duration) : 120,
      description: description ? description.trim() : '',
      poster: poster && poster.trim() !== '' ? poster.trim() : undefined,
      director: director ? director.trim() : '',
      isFavourite: Boolean(isFavourite),
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json({
      success: true,
      data: movie,
      message: 'Movie added successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing movie
// @route   PUT /api/movies/:id
// @access  Public / Protected
const updateMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    const {
      title,
      genre,
      language,
      releaseYear,
      rating,
      duration,
      description,
      poster,
      director,
      isFavourite,
    } = req.body;

    if (title !== undefined) movie.title = title.trim();
    if (genre !== undefined) movie.genre = genre.trim();
    if (language !== undefined) movie.language = language.trim();
    if (releaseYear !== undefined) movie.releaseYear = Number(releaseYear);
    if (rating !== undefined) movie.rating = Number(rating);
    if (duration !== undefined) movie.duration = Number(duration);
    if (description !== undefined) movie.description = description.trim();
    if (poster !== undefined && poster.trim() !== '') movie.poster = poster.trim();
    if (director !== undefined) movie.director = director.trim();
    if (isFavourite !== undefined) movie.isFavourite = Boolean(isFavourite);

    const updatedMovie = await movie.save();

    res.json({
      success: true,
      data: updatedMovie,
      message: 'Movie updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Public / Protected
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    await Movie.findByIdAndDelete(req.params.id);
    // Also clean up any reviews associated with this movie
    await Review.deleteMany({ movie: req.params.id });

    res.json({
      success: true,
      message: 'Movie and associated reviews removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle movie favourite status
// @route   PATCH /api/movies/:id/favourite
// @access  Public
const toggleFavourite = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    // If explicit isFavourite passed in body, use that, else toggle
    if (typeof req.body.isFavourite === 'boolean') {
      movie.isFavourite = req.body.isFavourite;
    } else {
      movie.isFavourite = !movie.isFavourite;
    }

    await movie.save();

    res.json({
      success: true,
      data: movie,
      message: movie.isFavourite
        ? 'Movie added to favourites'
        : 'Movie removed from favourites',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleFavourite,
};

