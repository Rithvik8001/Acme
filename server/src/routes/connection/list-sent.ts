import { Router } from "express";
import listSentController from "../../controllers/connection/list-sent.controller";

const route: Router = Router();

route.get("/requests/sent", listSentController);

export default route;
