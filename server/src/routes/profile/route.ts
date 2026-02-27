import { Router } from "express";
import meRoute from "./me";
import authMiddleware from "../../middlewares/auth";
import editProfileRoute from "./edit-profile";
import editPasswordRoute from "./edit-password";

const route: Router = Router();

route.use(authMiddleware);

route.use("/", meRoute);
route.use("/", editProfileRoute);
route.use("/", editPasswordRoute);

export default route;
