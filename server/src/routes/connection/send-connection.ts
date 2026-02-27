import { Router } from "express";
import sendConnectionController from "../../controllers/connection/send-connection.controller";

const route: Router = Router();

route.post("/request/send/:userId/:status", sendConnectionController);

export default route;
