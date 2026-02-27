import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import listDiscoverController from "../../controllers/discover/list.controller";

const route: Router = Router();

route.use(authMiddleware);
route.get("/", listDiscoverController);

export default route;
