import mongoose from 'mongoose';

const MONGO_URI: string = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
