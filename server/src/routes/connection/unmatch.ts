import { Router } from "express";
import unmatchController from "../../controllers/connection/unmatch.controller";

const route: Router = Router();

route.delete("/match/:connectionId", unmatchController);

export default route;
