import { app } from "./app";
import dotenv from "dotenv";
import ConnectDb from "./utils/database/db";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

//cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY,
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Listening to PORT ${process.env.PORT}`);
    ConnectDb();
});