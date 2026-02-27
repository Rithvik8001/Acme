import { Router } from "express";
import listMatchesController from "../../controllers/connection/list-matches.controller";

const route: Router = Router();

route.get("/matches", listMatchesController);

export default route;
