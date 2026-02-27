import { Router } from "express";
import deleteWorkExperienceController from "../../controllers/profile/delete-work-experience.controller";

const route: Router = Router();

route.delete("/work-experience/:id", deleteWorkExperienceController);

export default route;
