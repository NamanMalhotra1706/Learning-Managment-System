// get user by Id

import { Response } from "express";
//import userModel from "../models/user.model"
import { redis } from "../utils/redis";
import userModel from "../models/user.model";

export const getUserById = async(id:string, res:Response)=>{
    // const user = await userModel.findById(id);
    // res.status(201).json({
    //     success:true,
    //     message:'User find by Id Successfully',
    //     user
    // });

    // 2nd way to find user 
    const userJson = await redis.get(id);
    
    if(userJson){
        const user = JSON.parse(userJson);
    
    res.status(201).json({
        success:true,
        message:'User find by Id Successfully',
        user
    });
    }
};


// get all users

export const getAllUsersService =async (res:Response) => {

    const users = await userModel.find().sort({createdAt:-1});

    res.status(201).json({
        success:true,
        message:"All Users",
        users,
    });
}; 

// update User Role

export const updateUserRoleService = async(res:Response,id:string,role:string)=>{

    const user = await userModel.findByIdAndUpdate(id,{ role }, { new : true});

    res.status(201).json({
        success:true,
        message:`Role updated successfully`,
        user
    });
}