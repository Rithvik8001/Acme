import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import sendConnectionRoute from "./send-connection";

const route: Router = Router();

route.use(authMiddleware);

route.use("/", sendConnectionRoute);

export default route;
