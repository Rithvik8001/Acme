import { Router } from "express";
import listIncomingController from "../../controllers/connection/list-incoming.controller";

const route: Router = Router();

route.get("/requests/incoming", listIncomingController);

export default route;
