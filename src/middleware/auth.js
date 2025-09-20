import jwt from 'jsonwebtoken'
import userModel from '../../DB/models/User.model.js'


export const authMiddleware = (apiRoles=[]) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return next(new Error("Authorization token is required"));
        }

        if (!authorization.startsWith("Serri__")) {
            return next(new Error("In-valid authorization token"));
        }

        const token = authorization.split("Serri__")[1];

        const decoded = jwt.verify(token, process.env.LOGIN_TOKEN_SIGNATURE)
        if(!decoded){
            return next(new Error('In-valid token'))
        }

        const user = await userModel.findById(decoded.id)
        if(!user){
            return next(new Error('Authorized User Not Found'))
        }

        /* ==== Authorization ==== */
        if(!apiRoles.includes(user.role)){
            return next(new Error('You do not have permission'))
        }

        req.user = user
        next()
    }
}