import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

app.listen(8000, () => {
    connect();
    console.log("Listening to port 8000");
});