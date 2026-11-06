const dns = require('dns');

// Fix for Windows / ISP SRV DNS resolution with MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  let primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cineverse';

  // Ensure database name is set if user provided base Atlas URI
  if (primaryUri.includes('mongodb.net/') && !primaryUri.includes('mongodb.net/cineverse')) {
    primaryUri = primaryUri.replace('mongodb.net/', 'mongodb.net/cineverse');
  }

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️  MongoDB Connection Notice: ${err.message}`);
    console.log('💡 Note: Set MONGO_URI in server/.env with your MongoDB Atlas or local MongoDB connection string.');
    return null;
  }
};

const checkDbStatus = () => {
  return mongoose.connection.readyState === 1;
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected gracefully.');
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err.message);
  }
};

module.exports = { connectDB, disconnectDB, checkDbStatus };
