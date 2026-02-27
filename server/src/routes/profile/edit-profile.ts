import { Router } from "express";
import editProfileController from "../../controllers/profile/edit-profile.controller";

const route: Router = Router();

route.put("/edit-profile", editProfileController);

export default route;
