import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURL:string = process.env.DB_URI || "";

export const ConnectDB =async () => {
    try{
        await mongoose.connect(dbURL).then((data:any)=>{
        console.log(`Database Connected with ${data.connection.host}`);
        })
    }
    catch(error:any){
        console.log(`Error While Connecting to Database : ${error.message}`);
        setTimeout(ConnectDB,5000);
    }
}

export default ConnectDB;