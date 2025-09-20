import Joi from "joi";
import {idValidation} from '../../utils/idCustemValidation.js'
import { allSystemRoles } from "../../utils/systemRoles.js";




export const updateUserSchema = {

    body: Joi.object({
        name: Joi.string().min(3),
        password: Joi. string().min(6)
    }).required().options({presence: 'optional'})

}

export const deleteUserSchema = {

    params: Joi.object({
        userId: Joi.string().custom(idValidation)
    }).required().options({presence: 'required'})

}

export const changeUserRoleSchema = {

    params: Joi.object({
        userId: Joi.string().custom(idValidation)
    }).required().options({presence: 'required'}),

    
    body: Joi.object({
        role: Joi.string().valid(allSystemRoles.admin, allSystemRoles.user)
    }).required().options({presence: 'required'})

}