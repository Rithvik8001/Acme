import { Router } from "express";
import receiveConnectionController from "../../controllers/connection/receive-connection.controller";

const route: Router = Router();

route.post("/request/receive/:requestId/:status", receiveConnectionController);

export default route;
