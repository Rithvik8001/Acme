import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import sendConnectionRoute from "./send-connection";
import receiveConnectionRoute from "./receive-connection";
import listIncomingRoute from "./list-incoming";
import listSentRoute from "./list-sent";
import listMatchesRoute from "./list-matches";
import withdrawRequestRoute from "./withdraw-request";
import unmatchRoute from "./unmatch";

const route: Router = Router();

route.use(authMiddleware);

route.use("/", sendConnectionRoute);
route.use("/", receiveConnectionRoute);
route.use("/", listIncomingRoute);
route.use("/", listSentRoute);
route.use("/", listMatchesRoute);
route.use("/", withdrawRequestRoute);
route.use("/", unmatchRoute);

export default route;
