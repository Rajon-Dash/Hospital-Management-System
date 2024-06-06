import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'; // Import necessary modules
import { dbConnection } from "./database/dbConnect.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js"
import { errorMiddleware } from "./moddlewares/errorMiddleWare.js";

const app = express();
config({ path: "./config/config.env" });

// Derive __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DSHBORD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tempDir = path.join(__dirname, 'tmp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


dbConnection();

app.use(errorMiddleware);

export default app;
