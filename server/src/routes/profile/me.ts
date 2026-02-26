import { Router } from "express";
import meController from "../../controllers/profile/me.controller";

const route: Router = Router();

route.get("/me", meController);

export default route;
