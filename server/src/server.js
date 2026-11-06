const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { connectDB, checkDbStatus } = require('./config/db');
const { seedDataIfNeeded } = require('./seeds/seed');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Normalize URL to handle redundant slashes (e.g. //api/ -> /api/)
app.use((req, res, next) => {
  if (req.url && req.url.startsWith('//')) {
    req.url = req.url.replace(/^\/+/, '/');
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbConnected = checkDbStatus();
  res.json({
    status: 'online',
    database: dbConnected ? 'connected' : 'disconnected (pending MONGO_URI)',
    timestamp: new Date().toISOString(),
    service: 'CineVerse MERN REST API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root API documentation route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to CineVerse API - MERN Stack Movie Management System',
    endpoints: {
      health: 'GET /api/health',
      movies: 'GET /api/movies',
      movieDetails: 'GET /api/movies/:id',
      createMovie: 'POST /api/movies',
      updateMovie: 'PUT /api/movies/:id',
      deleteMovie: 'DELETE /api/movies/:id',
      toggleFav: 'PATCH /api/movies/:id/favourite',
      stats: 'GET /api/stats',
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        profile: 'GET /api/auth/me',
      },
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stats', statsRoutes);

// Root route
app.get('/', (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }
  res.json({
    name: 'CineVerse Backend API',
    version: '1.0.0',
    status: 'Running',
    docs: '/api',
  });
});

// Serve frontend in production if built
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('CineVerse Backend is running. Run client via Vite dev server or npm run build.');
    }
  });
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn) {
      await seedDataIfNeeded();
    }

    app.listen(PORT, () => {
      console.log(`🚀 CineVerse Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`📡 API Base: http://localhost:${PORT}/api/movies`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
};

startServer();

module.exports = app;
