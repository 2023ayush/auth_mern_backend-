import express from "express";

import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
const app = express();
config({ path: "./config/config.env" });
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/message", messageRouter);
dbConnection();
export default app;
