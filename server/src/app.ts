import express, { type Express } from "express";
import authRoute from "./routes/auth/route";
import profileRoute from "./routes/profile/route";
import connectionRoute from "./routes/connection/route";
import cors, { type CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma";
import type { Request, Response } from "express";

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
app.use(cookieParser());

// health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({
    sucess: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// api endpoints
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/connection", connectionRoute);

const PORT = process.env.PORT as string;

const startServer = async () => {
  try {
    await prisma.$connect().then(() => {
      console.log("Connected to the database");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

export default app;
