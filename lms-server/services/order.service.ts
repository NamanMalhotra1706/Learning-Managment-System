import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import orderModel from "../models/order.model";

//create new Order

export const newOrderService = CatchAsyncError(async(data:any,res:Response)=>{
    const order = await orderModel.create(data);
    res.status(201)
    .json({
        success:true,
        message:'Course buy successfully',
        order,
    })  
})

// All Order Service -- Admin
export const getAllOrderService =async (res:Response) => {

    const orders = await orderModel.find().sort({createdAt:-1});

    res.status(201).json({
        success:true,
        message:"All Orders",
        orders,
    });
}; 