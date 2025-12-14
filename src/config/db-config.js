import mongoose from "mongoose";
import { configDotenv } from 'dotenv';
configDotenv( )
export async function connectDB(){


    try {
       await  mongoose.connect(process.env.DB_URI)
       console.log("conectado a la base de datos")
    }catch (error){
        console.log(error)
    }
}



