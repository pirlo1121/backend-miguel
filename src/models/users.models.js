//mongoose

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre es obligatorio"],
        },

        email: {
            type: String,
            required: [true, "El correo es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Email inválido"],
        },

        password: {
            type: String,
            required: [true, "Password requerida"],
            minlength: [8, "La contraseña requiere min 8 caracteres"],
        },

        role: {
            type: String,
            enum: ["cliente", "owner", "admin"],
            default: "cliente",
        },

        verified: {
            type: Boolean,
            default: false,
        },

        verificationToken: {
            type: String,
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);


// {
//     "name": "miguel",
//     "age": 21,
//     "email": "dssadQ@asdd.com",
//     "pasword": "sdaasdasd332"

// }