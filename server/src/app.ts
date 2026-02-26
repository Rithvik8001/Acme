import express, { type Express } from "express";
import authRoute from "./routes/auth/route";
import cors, { type CorsOptions } from "cors";

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL as string,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "application/json"],
  exposedHeaders: ["Content-Type", "Authorization", "application/json"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);

export default app;
