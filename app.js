import express from "express";
import { config } from "dotenv";

import { dbConnection } from "./database/dbConnection.js";
const app = express();
config({ path: "./config/config.env" });

dbConnection();
export default app;
