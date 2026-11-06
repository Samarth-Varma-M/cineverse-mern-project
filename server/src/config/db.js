const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cineverse';

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 2500, // Quick 2.5s timeout if no local MongoDB running
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️  MongoDB Connection Notice: ${err.message}`);
    console.log('💡 Note: To connect to MongoDB:');
    console.log('   1. Create a free cluster on MongoDB Atlas (https://www.mongodb.com/atlas)');
    console.log('   2. Set MONGO_URI in server/.env (e.g. mongodb+srv://<user>:<password>@cluster0.mongodb.net/cineverse)');
    console.log('   3. Run `npm run seed` to populate starter movies.');
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
