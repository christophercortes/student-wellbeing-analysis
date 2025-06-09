import mongoose from 'mongoose';

const MONGO_URI: string = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error(
    'MONGO_URI is not defined in environment variables. Please add it to your .env.local file'
  );
}

// Define the shape of our cached object on the global scope.
// This is the recommended, type-safe way to handle this.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment the global object to include our mongoose cache property.
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * A robust, cached Mongoose connection function for Next.js.
 * This function ALWAYS returns a promise that resolves to the mongoose connection instance.
 */
async function connectDB(): Promise<typeof mongoose> {
  // If a connection is already cached, return it directly.
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create it.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Recommended for modern Mongoose
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      console.log('MongoDB Connected');
      return mongooseInstance;
    });
  }

  // Await the connection promise to resolve, cache the connection, and return it.
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // If the promise fails, clear it so a new attempt can be made on the next request.
    cached.promise = null;
    throw e;
  }

  // Return the newly established connection.
  return cached.conn;
}

export default connectDB;