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
            match: [/^\S+@\S+\.\S+$/, "Email inv\u00e1lido"],
        },

        password: {
            type: String,
            required: [true, "Password requerida"],
            minlength: [8, "La contrase\u00f1a requiere min 8 caracteres"],
        },

        role: {
            type: String,
            enum: ["cliente", "owner", "admin"],
            default: "cliente",
        }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
