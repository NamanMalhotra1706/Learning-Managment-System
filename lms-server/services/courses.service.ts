import { Response } from "express";
import courseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";

// Create a Course

export const createCourse = CatchAsyncError(async(data:any, res:Response)=>{
    const course = await courseModel.create(data);
    
    res.status(201).json({
        success:true,
        message:'Course created successfully',
        course
    });
});

export const getAllCoursesService =async (res:Response) => {

    const courses = await courseModel.find().sort({createdAt:-1});

    res.status(201).json({
        success:true,
        message:"All Courses",
        courses,
    });
}; 