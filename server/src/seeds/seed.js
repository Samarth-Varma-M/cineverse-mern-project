const dns = require('dns');

// Fix for Windows / ISP SRV DNS resolution with MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore
}

const path = require('path');
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

// If run directly from terminal: npm run seed
if (require.main === module) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
  let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cineverse';

  if (uri.includes('mongodb.net/') && !uri.includes('mongodb.net/cineverse')) {
    uri = uri.replace('mongodb.net/', 'mongodb.net/cineverse');
  }

  console.log('Connecting to MongoDB Atlas to seed data...');
  mongoose
    .connect(uri)
    .then(async () => {
      console.log('✅ Connected successfully!');
      await seedData();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err.message);
      process.exit(1);
    });
}

module.exports = { seedData, seedDataIfNeeded };
