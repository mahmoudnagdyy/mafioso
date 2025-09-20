import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/errorHandler.js";
import jwt from 'jsonwebtoken'
import {sendEmail} from '../../../utils/emailService.js'
import bcrypt from "bcryptjs";


// prettier-ignore
export const signup = asyncHandler(
    async (req, res, next) => {
        const {name, email, password} = req.body

        const checkUser = await userModel.findOne({email})
        if(checkUser){
            return next(new Error('Email Already Exist'))
        }

        const user = new userModel({name, email, password})
        const saveUser = await user.save()

        const token = jwt.sign({id: saveUser._id}, process.env.CONFIRM_TOKEN_SIGNATURE, {expiresIn: '1d'})

        sendEmail({
            to: email,
            subject: 'Confirm Your Email',
            html: `
                <p>Click on the link below to confirm your email</p>
                <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">confirm</a>
            `
        })

        return res.send({message: 'Check Your Email Inbox To Confirm Your Email'})
    }
)


// prettier-ignore
export const confirmEmail = asyncHandler(
    async (req, res, next) => {
        const {token} = req.params

        const decoded = jwt.verify(token, process.env.CONFIRM_TOKEN_SIGNATURE)
        if(!decoded){
            return next(new Error('In-valid Token'))
        }

        const user = await userModel.findById(decoded.id)
        if(!user){
            return next(new Error('User Not Found'))
        }

        if(user.isConfirmed){
            return next(new Error('Email Already Confirmed'))
        }

        const updateUser = await userModel.updateOne({_id: decoded.id}, {isConfirmed: true})

        sendEmail({
            to: user.email,
            subject: 'Confirm Email',
            html: '<p>Congratulations, Your email confirmed successfully.</p>'
        })

        return res.redirect(process.env.LOGIN_FRONTEND_URL);
    }
)


// prettier-ignore
export const login = asyncHandler(
    async (req, res, next) => {
        const {email, password} = req.body

        const checkUser = await userModel.findOne({email})
        if(!checkUser){
            return next(new Error('Email Not Found'))
        }

        const checkPassword = bcrypt.compareSync(password, checkUser.password)
        if(!checkPassword){
            return next(new Error('Wrong Email Or Password'))
        }

        if(!checkUser.isConfirmed){
            return next(new Error('Confirm your email first'))
        }

        const token = jwt.sign({id: checkUser._id}, process.env.LOGIN_TOKEN_SIGNATURE)
        return res.send({message: 'User loggedin', token})
    }
)