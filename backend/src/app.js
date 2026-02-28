import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//inbuild middlewares in express
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" })); //config the json Data
app.use(urlencoded({ extended: true, limit: "16kb" })); // config the data comes via URL(params)
app.use(express.static("public"))  // handle the static filer or data inside the public folder
app.use(cookieParser());   // for taking the cookies from the browser

export default app;
