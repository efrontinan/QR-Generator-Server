import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'El email de usuario es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria']
        },
        username: {
            type: String,
            required: [true, 'El username es obligatorio']
        },
        birth: {
            type: Date,
            required: [true, 'La fecha de nacimiento es obligatoria']
        },
    },

    {
        timestamps: true
    }
)

const User = model("User", userSchema)

export default User