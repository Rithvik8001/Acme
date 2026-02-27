import { Router } from "express";
import meRoute from "./me";
import authMiddleware from "../../middlewares/auth";
import editProfileRoute from "./edit-profile";

const route: Router = Router();

route.use("/", authMiddleware, meRoute);
route.use("/", authMiddleware, editProfileRoute);

export default route;
