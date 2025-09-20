import Joi from "joi";



export const signupSchema = {

    body: Joi.object({
        name: Joi.string().min(3).max(20),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        confirmPassword: Joi.string().valid(Joi.ref('password'))
    }).required().options({presence: 'required'})

}


export const loginSchema = {

    body: Joi.object({
        email: Joi.string().email(),
        password: Joi.string(),
    }).required().options({presence: 'required'})

}