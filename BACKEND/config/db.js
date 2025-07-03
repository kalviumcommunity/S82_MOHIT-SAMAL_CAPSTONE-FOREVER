console.log("🧠 DB.js loaded at", new Date().toISOString());

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
