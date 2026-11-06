const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a movie title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    genre: {
      type: String,
      required: [true, 'Please select or provide a genre'],
      trim: true,
      default: 'Drama',
    },
    language: {
      type: String,
      trim: true,
      default: 'English',
    },
    releaseYear: {
      type: Number,
      required: [true, 'Please provide the release year'],
      min: [1888, 'Year must be 1888 or later'],
      max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future'],
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be negative'],
      max: [10, 'Rating cannot exceed 10'],
      default: 0,
    },
    duration: {
      type: Number, // duration in minutes
      min: [1, 'Duration must be at least 1 minute'],
      default: 120,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      default: 'No description provided yet.',
    },
    poster: {
      type: String,
      trim: true,
      default: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    director: {
      type: String,
      trim: true,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for reviews associated with this movie
movieSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'movie',
  justOne: false,
});

module.exports = mongoose.model('Movie', movieSchema);
