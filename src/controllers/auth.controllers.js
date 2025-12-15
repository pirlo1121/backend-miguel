import { createToken } from "../helpers/jwt.js";
import { UserModel } from "../models/users.models.js"
import bcrypt from 'bcrypt'
import { transporter } from "../config/nodemailer.js";
import jwt from "jsonwebtoken";



export const verifyToken = async (req, res) => {

 try{

    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const  user =  await UserModel.findOne ({email : decoded.email});
    if(!user) return res.status(404).json({ msg : "usuario no encontrado"});

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({msg : "correo verificado con exito"})

    } catch (error){
        console.log(error)
    res.status(400).json({ message: "Token inválido o expirado" });
    }

}
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "El correo ya está registrado" });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        
        const verificationTokenLink = `http://localhost:4200/verify/${token}`;


         const saltRounds = 10; //entre mas alto seguro 
        const hashPasword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
            name,
            email,
            password : hashPasword ,
          
        });

        await newUser.save();

        await transporter.sendMail({
            from: `"Verificación" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verifica tu cuenta",
            html: `
                <p>Hola ${name}, gracias por registrarte en Burguer Master 🍔.</p>
                <p>Para verificar tu cuenta, haz clic aquí:</p>
                <a href="${verificationTokenLink}">click Aqui</a>
            `,
        });

        res.status(200).json({
            message: "Usuario registrado. Revisa tu correo para verificar tu cuenta.",
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
        if(!userFound.verified){
            return res.status(403).json({ok: false, msg : 'verifica tu cuenta primero'})
        }

        const isValid = await bcrypt.compare(password, userFound.password);

        if(!isValid){
          return res.status(400).json({ok: false , msg : "contraseña incorrecta"});  
        }

        const token = createToken({ id: userFound._id, email: userFound.email, verified : userFound.verified });

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
