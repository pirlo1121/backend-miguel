import { createToken } from "../helpers/jwt.js";
import { UserModel } from "../models/users.models.js"
import bcrypt from 'bcrypt'


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "El correo ya est\u00e1 registrado" });

        const saltRounds = 10;
        const hashPasword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
            name,
            email,
            password: hashPasword
        });

        await newUser.save();

        res.status(200).json({
            message: "Usuario registrado exitosamente",
        });

    } catch (error) {
        console.error("ERROR REGISTER USER:", error);
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};


export async function login (req, res){

    try{
         const {email,password}=req.body;
         const userFound = await UserModel.findOne({email});
         
        if(!userFound){
            return res.status(404).json ({ok:false,msg:"correo no registrado"});
        }

        const isValid = await bcrypt.compare(password, userFound.password);

        if(!isValid){
          return res.status(400).json({ok: false , msg : "contrase\u00f1a incorrecta"});  
        }

        const token = createToken({ id: userFound._id, email: userFound.email });

        res.status(200).json({
          ok: true,
          token,
          role: userFound.role,
          user: {
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email
          }
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({ok: false, msg:"error interno"})
    }
}
