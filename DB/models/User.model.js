import { Schema, model } from "mongoose";
import { allSystemRoles } from "../../src/utils/systemRoles.js";
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: allSystemRoles.user,
            enum: [allSystemRoles.admin, allSystemRoles.user]
        },

        isConfirmed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUND);
    next()
})

const userModel = model('User', userSchema)
export default userModel