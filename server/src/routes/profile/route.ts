import { Router } from "express";
import meRoute from "./me";
import authMiddleware from "../../middlewares/auth";
import editProfileRoute from "./edit-profile";
import editPasswordRoute from "./edit-password";

const route: Router = Router();

route.use("/", authMiddleware, meRoute);
route.use("/", authMiddleware, editProfileRoute);
route.use("/", authMiddleware, editPasswordRoute);

export default route;
