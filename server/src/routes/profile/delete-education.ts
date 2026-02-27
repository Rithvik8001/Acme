import { Router } from "express";
import deleteEducationController from "../../controllers/profile/delete-education.controller";

const route: Router = Router();

route.delete("/education/:id", deleteEducationController);

export default route;
