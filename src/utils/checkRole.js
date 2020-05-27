export const checkRole = (userRoles, checkRole) => {
    for (const user in userRoles){
        if(userRoles[user].abreviation === checkRole) {
            return true
        }
    }
    return false
}

export const checkTimeslotCategorie = (categorieList, categorieId) => {


    for (const index in categorieList) {
        if(categorieList[index].id === categorieId) {
            return categorieList[index]
        }
    }
    return null
}