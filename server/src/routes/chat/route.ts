import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import listMessagesRoute from "./list-messages";

const route: Router = Router();

route.use(authMiddleware);
route.use("/", listMessagesRoute);

export default route;
