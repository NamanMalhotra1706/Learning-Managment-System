import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./route/user.route";
import courseRoute from "./route/course.route";
import orderRouter from "./route/order.route";
import notificationRoute from "./route/notification.route";
import analyticsRouter from "./route/analytics.route";
import layoutRoute from "./route/layout.route";
import rateLimit from "express-rate-limit";

dotenv.config();

export const app = express();
//body parser
app.use(express.json({limit:"50mb"}));

//cookie parser
app.use(cookieParser());

// cors
app.use(cors(
    {
        origin:['http://localhost:3000'],
        credentials:true,
    }
));
// app.use(cors());

// Router
app.use("/api/v1",userRouter);
app.use("/api/v1",courseRoute);
app.use("/api/v1",orderRouter);
app.use("/api/v1",notificationRoute);
app.use("/api/v1",analyticsRouter);
app.use("/api/v1",layoutRoute);


// API's 
app.get('/test',(req,res,next)=>{
    res.status(200).json({
        success:true,
        message: 'Api is Working'
    });
});

// Unknown Routes
app.all("*",(req,res,next)=>{
    const err = new Error(`Routes ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})

const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    standardHeaders:'draft-7',
    legacyHeaders:false,
})

app.use(limiter);

// Error Middleware
app.use(ErrorMiddleware);