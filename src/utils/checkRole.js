export const checkRole = (userRoles, checkRole) => {
    for (const user in userRoles){
        if(userRoles[user].abreviation === checkRole) {
            return true
        }
    }
    return false
}
