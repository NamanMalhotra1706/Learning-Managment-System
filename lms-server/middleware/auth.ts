import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from './catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redis } from '../utils/redis';
import { IUser } from '../models/user.model';
import { updateAccessToken } from "../controllers/user.controller";

declare global{
    namespace Express {
        interface Request {
        user?: IUser;
        }
    }
}

// Authenticated User
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token as string;

  if (!access_token) {
    return next(new ErrorHandler('Please Login to authenticate', 400));
  }

  console.log(access_token);

 
    const decode = jwt.decode(access_token) as JwtPayload;

    if (!decode) {
      return next(new ErrorHandler('Access Token is not Valid', 400));
    }

    // check if the access token is expired
    if(decode.exp && decode.exp<=Date.now() / 1000){
      try{
        await updateAccessToken(req,res,next);
      }
      catch(err){
        return next(err);
      }
    }else{
      const user = await redis.get(decode.id);

      if (!user) {
        return next(new ErrorHandler('Please Login to access this resource', 400));
      }
  
      req.user = JSON.parse(user);
  
      next();
    }

   
});

// validate user role

export const authorizeRoles = (...roles:string[])=>{

    return(req:Request, res:Response, next:NextFunction)=>{
        if(!roles.includes(req.user?.role||'')){
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`,403));
        } 
        next();
    }
}