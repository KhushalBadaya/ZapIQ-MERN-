import mongoose from "mongoose";
import { ENV } from "./env.js";
mongoose.set("strictQuery", false); 
export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log("MongoDb Connected : ",conn.connection.host)
    } catch (error) {
        console.log("Error Connecting to MongoDb : ",error)
        process.exit(1);
    }
}