const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');
const moviesData = require('../data/movies.json');

const seedData = async () => {
  console.log('🌱 Seeding database...');

  // Clear existing collections
  await Movie.deleteMany({});
  await User.deleteMany({});
  await Review.deleteMany({});

  // Create default admin user
  const adminUser = await User.create({
    name: 'Admin Developer',
    email: 'admin@cineverse.com',
    password: 'admin123',
    role: 'admin',
  });

  // Create default student user
  const studentUser = await User.create({
    name: 'Student Demo User',
    email: 'student@cineverse.com',
    password: 'student123',
    role: 'user',
  });

  // Insert movies
  const preparedMovies = moviesData.map((movie) => ({
    ...movie,
    createdBy: adminUser._id,
  }));

  const insertedMovies = await Movie.insertMany(preparedMovies);
  console.log(`🎬 Seeded ${insertedMovies.length} movies.`);

  // Add sample reviews for top movies
  const inception = insertedMovies.find((m) => m.title === 'Inception');
  const interstellar = insertedMovies.find((m) => m.title === 'Interstellar');

  if (inception) {
    await Review.create({
      movie: inception._id,
      user: studentUser._id,
      userName: studentUser.name,
      rating: 5,
      comment: 'An absolute masterpiece of cinema and mind-bending storytelling! Christopher Nolan at his finest.',
    });
  }

  if (interstellar) {
    await Review.create({
      movie: interstellar._id,
      user: adminUser._id,
      userName: adminUser.name,
      rating: 5,
      comment: 'The emotional depth paired with the scientific realism and Hans Zimmer score is breathtaking.',
    });
  }

  console.log('⭐ Seeded initial reviews.');
  console.log('✅ Seeding complete!');
};

const seedDataIfNeeded = async () => {
  const count = await Movie.countDocuments();
  if (count === 0) {
    console.log('Database is empty. Populating with starter movie catalog...');
    await seedData();
  }
};

// If run directly from terminal: node src/seeds/seed.js
if (require.main === module) {
  require('dotenv').config();
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cineverse';

  mongoose
    .connect(uri)
    .then(async () => {
      await seedData();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err.message);
      process.exit(1);
    });
}

module.exports = { seedData, seedDataIfNeeded };
