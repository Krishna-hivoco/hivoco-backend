import mongoose from "mongoose";
import { config } from "dotenv";
config();
const connectDB = async () => {
  try {
    const uri = process.env.MONGOOSE_URI;
    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
connectDB();
