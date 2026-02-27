import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import sendConnectionRoute from "./send-connection";
import receiveConnectionRoute from "./receive-connection";

const route: Router = Router();

route.use(authMiddleware);

route.use("/", sendConnectionRoute);
route.use("/", receiveConnectionRoute);

export default route;
