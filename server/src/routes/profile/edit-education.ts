import { Router } from "express";
import editEducationController from "../../controllers/profile/edit-education.controller";

const route: Router = Router();

route.patch("/education/:id", editEducationController);

export default route;
