import { Router } from "express";
import signupController from "../../controllers/auth/signup";

const route: Router = Router();

route.post("/signup", signupController);

export default route;
