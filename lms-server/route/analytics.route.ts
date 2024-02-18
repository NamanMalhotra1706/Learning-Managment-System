import { Router } from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getCoursesAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analytics.controller";

const analyticsRouter = Router();

analyticsRouter.get("/get-users-analytics",isAuthenticated,authorizeRoles("admin"),getUserAnalytics);
analyticsRouter.get("/get-courses-analytics",isAuthenticated,authorizeRoles("admin"),getCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics",isAuthenticated,authorizeRoles("admin"),getOrderAnalytics);

export default analyticsRouter;
