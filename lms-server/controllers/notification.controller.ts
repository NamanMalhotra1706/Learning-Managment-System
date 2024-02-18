import NotificationModel from "../models/notificationModel";
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cron from 'node-cron';

// get all notifications --only admin
export const getNotification = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{

    try{
        const notifications = await NotificationModel.find().sort({createdAt: -1});
        res.status(201).json({
            success:true,
            message:'Got a new notification',
            notifications,
        });

    }
    catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
});


// Update notification status
export const updateNotificationStatus = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const notification = await NotificationModel.findById(req.params.id);
       
        if(!notification){
            return next(new ErrorHandler('No new notifications',400));
        }
        else{
            notification.status ? notification.status = 'read' : notification?.status;
        }

        await notification.save();

        const notifications = await NotificationModel.find().sort({ createdAt: -1 });

        res.status(201).json({
            succes:true,
            message:`Updated Notification's`,
            notifications,
        });
    }
    catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
});

// delete notification --admin only
cron.schedule("0 0 0 * * *",async()=>{ // Function will run automatically at 12 AM every night
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    await NotificationModel.deleteMany({status:"read",createdAt:{$lt: thirtyDaysAgo}});
    
    console.log('Deleted a month ago read notifications');
});