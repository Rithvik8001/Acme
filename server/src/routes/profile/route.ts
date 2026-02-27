import { Router } from "express";
import meRoute from "./me";
import authMiddleware from "../../middlewares/auth";
import editProfileRoute from "./edit-profile";
import editPasswordRoute from "./edit-password";
import editWorkExperienceRoute from "./edit-work-experience";
import editEducationRoute from "./edit-education";
import deleteWorkExperienceRoute from "./delete-work-experience";
import deleteEducationRoute from "./delete-education";

const route: Router = Router();

route.use(authMiddleware);

route.use("/", meRoute);
route.use("/", editProfileRoute);
route.use("/", editPasswordRoute);
route.use("/", editWorkExperienceRoute);
route.use("/", editEducationRoute);
route.use("/", deleteWorkExperienceRoute);
route.use("/", deleteEducationRoute);

export default route;
