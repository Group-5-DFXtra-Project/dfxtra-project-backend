import express from "express";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js';
import profileRoutes from './routes/profileInfoRoute.js';

config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

const main = async ()=>{
    console.log(`connecting to DB @ ${process.env.MONGO}`);
    await mongoose.connect(process.env.MONGO);
    console.log(`connected to DB @ ${process.env.MONGO}`);  
};

main().catch(err => console.log(err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);



const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

export default app;