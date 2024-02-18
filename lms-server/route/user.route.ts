import express from "express";
import { activateUser, deleteCourse, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerationUser, socialAuth, updateAccessToken, updatePassword, updateProfileAvatar, updateUserInfo, updateUserRole } from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/registration',registerationUser);
userRouter.post('/activate-user',activateUser);
userRouter.post('/login-user',loginUser);
userRouter.get('/logout',isAuthenticated,logoutUser);
// userRouter.get('/refreshtoken',updateAccessToken);
userRouter.get("/me",isAuthenticated,getUserInfo);
userRouter.post("/socialAuth",socialAuth);
userRouter.put("/update-user-info",isAuthenticated,updateUserInfo);
userRouter.put("/update-user-password",isAuthenticated,updatePassword);
userRouter.put("/update-user-avatar",isAuthenticated,updateProfileAvatar);
userRouter.get("/get-users",isAuthenticated,authorizeRoles("admin"),getAllUsers);
userRouter.put("/update-user-role",isAuthenticated,authorizeRoles("admin"),updateUserRole);
userRouter.delete("/delete-user",isAuthenticated,authorizeRoles("admin"),deleteUser);


export default userRouter;