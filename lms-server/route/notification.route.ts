import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getNotification, updateNotificationStatus } from '../controllers/notification.controller';

const notificationRoute = express.Router();

notificationRoute.get("/get-all-notifications",isAuthenticated,authorizeRoles("admin"),getNotification);
notificationRoute.get("/get-update-notifications/:id",isAuthenticated,authorizeRoles("admin"),updateNotificationStatus);

export default notificationRoute;