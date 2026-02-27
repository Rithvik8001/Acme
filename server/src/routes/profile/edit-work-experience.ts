import { Router } from "express";
import editWorkExperienceController from "../../controllers/profile/edit-work-experience.controller";

const route: Router = Router();

route.patch("/work-experience/:id", editWorkExperienceController);

export default route;
