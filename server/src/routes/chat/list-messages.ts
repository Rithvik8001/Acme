import { Router } from "express";
import listMessagesController from "../../controllers/chat/list-messages.controller";

const route: Router = Router();

route.get("/:connectionId/messages", listMessagesController);

export default route;
