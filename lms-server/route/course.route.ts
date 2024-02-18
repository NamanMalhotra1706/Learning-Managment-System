import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { addAnswer, addQuestion, addReplyToReview, addReview, editCourse, generateVideoUrl, getAllCourses, getAllCoursesByAdmin, getCourseByUser, getSinglecourse, uploadCourse } from '../controllers/course.controller';
import { deleteCourse } from '../controllers/user.controller';

const courseRoute = express.Router();

courseRoute.post("/create-course",isAuthenticated,authorizeRoles("admin"),uploadCourse);
courseRoute.put("/update-course/:id",isAuthenticated,authorizeRoles("admin"),editCourse);
courseRoute.get("/get-course/:id",getSinglecourse);
courseRoute.get("/get-all-course",getAllCourses);
courseRoute.get("/get-course-content/:id",isAuthenticated,getCourseByUser);
courseRoute.post("/add-question",isAuthenticated,addQuestion);
courseRoute.put("/add-answer",isAuthenticated,addAnswer);
courseRoute.put("/add-review/:id",isAuthenticated,addReview);
courseRoute.put("/add-reply",isAuthenticated,authorizeRoles("admin"),addReplyToReview);
courseRoute.get("/get-admin-courses",getAllCoursesByAdmin);
courseRoute.post("/getVdoCipherOTP",generateVideoUrl);
courseRoute.delete("/delete-course",isAuthenticated,authorizeRoles("admin"),deleteCourse);

export default courseRoute;
