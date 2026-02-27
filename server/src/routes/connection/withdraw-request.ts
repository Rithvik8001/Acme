import { Router } from "express";
import withdrawRequestController from "../../controllers/connection/withdraw-request.controller";

const route: Router = Router();

route.delete("/request/:requestId", withdrawRequestController);

export default route;
