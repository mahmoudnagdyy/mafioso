import { allSystemRoles } from "../../utils/systemRoles.js";



export const userApiRoles = {
    getAllUsers: [allSystemRoles.admin],
    getUser: [allSystemRoles.admin, allSystemRoles.user],
    updateUser: [allSystemRoles.admin, allSystemRoles.user],
    deleteUser: [allSystemRoles.admin],
    deleteUserProfile: [allSystemRoles.admin, allSystemRoles.user],
    changeUserRole: [allSystemRoles.admin]
}