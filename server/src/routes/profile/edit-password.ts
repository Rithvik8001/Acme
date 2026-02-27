import { Router } from "express";
import editPasswordController from "../../controllers/profile/edit-password.controller";

const route: Router = Router();

route.put("/edit-password", editPasswordController);

export default route;
