import { Router } from "express";
import meRoute from "./me";
import authMiddleware from "../../middlewares/auth";

const route: Router = Router();

route.use("/", authMiddleware, meRoute);

export default route;
