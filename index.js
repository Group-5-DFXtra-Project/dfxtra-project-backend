import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js';
import profileRoutes from './routes/profileInfoRoute.js';


const app = express();
dotenv.config();

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            throw err;
        });
};
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);



app.listen(8000, () => {
    connect();
    console.log("Listening to port 8000");
});