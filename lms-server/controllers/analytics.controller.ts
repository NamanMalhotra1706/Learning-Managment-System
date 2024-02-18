import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";

//User data Analytics --Only for admins
export const getUserAnalytics = CatchAsyncError(async(req:Request, res:Response , next:NextFunction)=>{

    try{
        const users = await generateLast12MonthsData(userModel);

        res.status(201).json({
            success:true,
            message:"Users Analytics",
            users,

        })
    }
    catch(err:any){
        return next(new ErrorHandler(err.message,400));
    }
});

// Courses data analytics
export const getCoursesAnalytics = CatchAsyncError(async(req:Request, res:Response , next:NextFunction)=>{

    try{
        const courses = await generateLast12MonthsData(courseModel);

        res.status(201).json({
            success:true,
            message:"Courses Analytics",
            courses,

        })
    }
    catch(err:any){
        return next(new ErrorHandler(err.message,400));
    }
});

//Get Order Analytics
export const getOrderAnalytics = CatchAsyncError(async(req:Request, res:Response , next:NextFunction)=>{

    try{
        const orders = await generateLast12MonthsData(orderModel);

        res.status(201).json({
            success:true,
            message:"Orders Analytics",
            orders,
        });
    }
    catch(err:any){
        return next(new ErrorHandler(err.message,400));
    }
});
