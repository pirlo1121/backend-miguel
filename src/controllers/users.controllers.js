import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "../models/users.models.js";


dotenv.config();



export async function getusers(req, res) {
    try {
        //metodos de consulta mongoose
        const users = await UserModel.find(); //para que no se vean las contraseñas
        //estados http
        return res.status(200).json({ok: true, users})      

    } catch (error) {
        console.log(error)
       return res.status(500).json({ok: false, msg:"error interno"})
    }
}
export async function getUserById (req,res){
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)){
            return res.status(400).json({ok: false, msg: "ID invalido"})
        }

        const user = await UserModel.findById(id)
        if( !user ){
            return res.status(404).json({ok: false, msg: "usuario no encontrado"})

        }
        return res.status(200).json({ok: true , user})

    } catch (error) {
        return res.status(500).json({ok: false, msg:"error interno"})
    }
}


export async function  updateusers (req, res){
    try {
       const id = req.params.id;
       const data = req.body;

       const userUptade = await UserModel.findByIdAndUpdate(id, data, {new: true});
       if(!userUptade){
        return res.status(404).json({ok: false, msg : "error interno"})
       }
       return res.status(200).json({ok: true, userUptade})
    } catch (error) {
        console.log(error)
       return res.status(500).json({ok: false, msg:"error interno"})
        
    }
}

export async function  deleteusers (req, res){
    try {
        const id = req.params.id;

        const deletedUser = await UserModel.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json ({ok: false, msg : "usuario no encontrado"})
        }
        return res.status(200).json({ok:true, msg : "ususario eliminado"})
        
    } catch (error) {
       return res.status(500).json({ok: false, msg:"error interno"})
        
    }
}