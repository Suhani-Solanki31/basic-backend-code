import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";
import dotenv from "dotenv";
dotenv.config();


const connectDb = async()=>{
    try {
        let res = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        if(res){
            console.log(`database is connected || DB HOST : ${res.connection.host}`);
        }
    } catch (error) {
        console.log("Error in connecting DB : ",error);
        process.exit(1);
        
    }
}

export default connectDb;