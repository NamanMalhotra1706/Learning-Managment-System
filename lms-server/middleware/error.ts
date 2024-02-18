import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err:any, req:Request,res:Response,next:NextFunction)=>{
    err.statusCode = err.statusCode || 500;

    err.message = err.message || 'Internal Server Error';
    
    //Wrong MongoDB Id
    if(err.name==='CastError'){
        const message = `Resources not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Duplicate Error
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT Token
    if(err.name==='JsonWebTokenError'){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT expire Error
    if(err.name==='TokenExpiredError'){
        const message = `Json Web Token is expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
}