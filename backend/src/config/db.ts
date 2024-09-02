//import mongoose from 'mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;

if (!mongoURI) {
    throw new Error("MongoURI is not defined in the environment variables");
}

// MongoDB connection function
export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);

        console.log("Database connected");
    } catch (err) {
        // Ensuring err is typed properly
        if (err instanceof Error) {
            console.error("Error:", err.message);
        } else {
            console.error("Unknown error:", err);
        }
    }
};

// Listen for MongoDB connection status
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});
