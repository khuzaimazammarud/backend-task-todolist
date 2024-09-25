// lib/mongodb.js
import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://muscle:muscle123@cluster0.juxhtqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Your MongoDB URI here

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new MongoDB connection...");
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      return mongoose;
    }).catch((error) => {
      throw new Error("Failed to connect to MongoDB");
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongo;
