import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/errorHandler.js";
import bcrypt from "bcryptjs";




// prettier-ignore
export const getAllUsers = asyncHandler(
    async (req, res, next) => {
        const users = await userModel.find({})
        return res.send({message: 'All Users', users})
    }
)


// prettier-ignore
export const getUser = asyncHandler(
    async (req, res, next) => {
        return res.send({message: 'user', user: req.user})
    }
)


// prettier-ignore
export const updateUser = asyncHandler(
    async (req, res, next) => {
        const {name, password} = req.body

        if(!name && !password){
            return next(new Error('Old and new data are same!'))
        }

        let user

        if(name && password){
            if (req.user.name == name.toLowerCase()) {
                return next(new Error("Old and new name are same"));
            }
            if (bcrypt.compareSync(password, req.user.password)) {
                return next(new Error("Old and new password are same"));
            }
            user = req.user
            user.name = name
            user.password = password
            const saveUser = await user.save()
            return res.send({message: 'User Updated', user: saveUser})
        }
        else if(name){
            if (req.user.name == name.toLowerCase()) {
                return next(new Error("Old and new name are same"));
            }
            user = await userModel.findByIdAndUpdate({_id: req.user._id}, {name}, {new: true})
            return res.send({message: 'User Updated', user})
        }
        else if(password){
            if (bcrypt.compareSync(password, req.user.password)) {
                return next(new Error("Old and new password are same"));
            }
            user = req.user
            user.password = password
            const saveUser = await user.save()
            return res.send({ message: "User Updated", user: saveUser });
        }
    }
)


// prettier-ignore
export const deleteUser = asyncHandler(
    async (req, res, next) => {
        const {userId} = req.params

        const checkUser = await userModel.findById(userId)
        if(!checkUser){
            return next(new Error('User Not Found'))
        }

        const deleteUser = await userModel.deleteOne({_id: userId})
        return res.send({message: deleteUser.deletedCount? 'You Deleted A User' : 'Delete User Failed'})
    }
)


// prettier-ignore
export const deleteUserProfile = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.deleteOne({_id: req.user._id})
        return res.send({message: user.deletedCount? 'You Deleted Your Profile' : 'Delete User Failed'})
    }
)


// prettier-ignore
export const changeUserRole = asyncHandler(
    async (req, res, next) => {
        const {userId} = req.params
        const {role} = req.body

        const user = await userModel.findByIdAndUpdate(userId, {role}, {new: true})
        if(!user){
            return next(new Error('User Not Found'))
        }
        return res.send({message: "User's role changed", user})
    }
)