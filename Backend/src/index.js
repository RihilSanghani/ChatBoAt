import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/messageRoute.route.js"
import { ConnectDB } from "./lib/db.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoute)

app.listen(PORT, () => {
    console.log(`This app is listening at port https://localhost:5000`);
    ConnectDB();
})