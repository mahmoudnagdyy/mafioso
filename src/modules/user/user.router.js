import { Router } from "express";
import * as userController from "./controller/user.controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { userApiRoles } from "./user.apiRoles.js";
import { validationMiddleware } from "../../middleware/validation.js";
import * as userValidators from "./user.validationSchema.js";
import { allSystemRoles } from "../../utils/systemRoles.js";

const router = Router();

router.get(
    "/allUsers",
    authMiddleware(userApiRoles.getAllUsers),
    userController.getAllUsers
);

router.get("/", authMiddleware(userApiRoles.getUser), userController.getUser);

router.put(
    "/",
    authMiddleware(userApiRoles.updateUser),
    validationMiddleware(userValidators.updateUserSchema),
    userController.updateUser
);

router.delete(
    "/:userId",
    authMiddleware(userApiRoles.deleteUser),
    validationMiddleware(userValidators.deleteUserSchema),
    userController.deleteUser
);

router.delete(
    "/",
    authMiddleware(userApiRoles.deleteUserProfile),
    userController.deleteUserProfile
);

router.patch(
    "/changeRole/:userId",
    authMiddleware(userApiRoles.changeUserRole),
    validationMiddleware(userValidators.changeUserRoleSchema),
    userController.changeUserRole
);

export default router;
