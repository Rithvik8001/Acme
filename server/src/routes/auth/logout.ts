import { Router } from "express";
import logoutController from "../../controllers/auth/logout.controller";

const route: Router = Router();

route.get("/logout", logoutController);

export default route;
