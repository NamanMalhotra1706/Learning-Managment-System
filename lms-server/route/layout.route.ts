import { Router } from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layouts.controller";

const layoutRoute = Router();

layoutRoute.post("/create-layout",isAuthenticated,authorizeRoles("admin"),createLayout);
layoutRoute.put("/edit-layout",isAuthenticated,authorizeRoles("admin"),editLayout);
layoutRoute.get("/get-layout/:type",getLayoutByType);

export default layoutRoute;