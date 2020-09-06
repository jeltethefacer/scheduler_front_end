import tokenRequest from "../utils/axiosInstance"
const baseUrl = `/api/moderator`

export const getUsers = (token) => {
    return async dispatch => {
        try {
            const users = await tokenRequest(token).get(`${baseUrl}/users`)

            const userList = users.data
            dispatch({
                type: "USERS_LIST",
                data: {
                    userList: userList
                }
            })
        } catch (error) {
            console.log(error.response.status)
            switch (error.response.status) {
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const addUser = (token, email, frontName, lastName) => {
    return async dispatch => {
        try {
            const user = await tokenRequest(token).post(`${baseUrl}/addUser`,
                {
                    email: email,
                    frontName: frontName,
                    lastName: lastName
                }
            )
            const userEntity = user.data

            //refresh user list
            dispatch({
                type: "ADD_USER",
                data: {
                    user: userEntity
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "VALIDATION_ERROR_ADD_USER",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const deleteUser = (token, userId) => {
    return async dispatch => {
        try {
            await tokenRequest(token).post(`${baseUrl}/deleteUser`,
                {
                    userId: userId
                }
            )
            //refresh user list
            dispatch({
                type: "DELETE_USER_SUCCES",
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "VALIDATION_ERROR_ADD_USER",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const addRole = (token, abreviation, description) => {
    return async dispatch => {
        try {
            const role = await tokenRequest(token).post(`${baseUrl}/addRole`,
                {
                    abreviation: abreviation,
                    description: description
                }
            )
            const roleEntity = role.data
            console.log("addRole", roleEntity)
            //add role to role list
            dispatch({
                type: "ADD_ROLE",
                data: {
                    role : roleEntity
                }    
            })
        } catch (error) {
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "VALIDATION_ERROR_ADD_ROLE",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const toggleRole = (token, roleId, userId) => {
    return async dispatch => {
        try {
            console.log('lamo')

            const toggleRoleRespone = await tokenRequest(token).post(`${baseUrl}/toggleRole`,
                {
                    roleId: roleId,
                    userId: userId
                }
            )

            const roleEntity = toggleRoleRespone.data.role
            const userEntity = toggleRoleRespone.data.user
            console.log("addRole", toggleRoleRespone.data)
            //add role to role list
            dispatch({
                type: "TOGGLE_ROLE",
                data: {
                    user : userEntity,
                    role: roleEntity
                }    
            })
        } catch (error) {
            console.log(error)
            if(!error.response){
                dispatch({
                    type: "WEIRD_ERROR"
                })
                return;
            }

            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "VALIDATION_ERROR_ADD_ROLE",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const toggleChairman = (token, roleId, userId) => {
    return async dispatch => {
        try {
            const toggleChairmanResponse = await tokenRequest(token).post(`${baseUrl}/toggleChairman`,
                {
                    roleId: roleId,
                    userId: userId
                }
            )
            const userEntity = toggleChairmanResponse.data
            //add role to role list
            dispatch({
                type: "TOGGLE_CHAIRMAN",
                data: {
                    user : userEntity.user,
                    role: userEntity.role
                }    
            })
        } catch (error) {
            console.log(error)
            if(!error.response){
                dispatch({
                    type: "WEIRD_ERROR"
                })
                return;
            }

            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "TOGGLE_CHAIRMAN_ERROR",
                        data: {
                            erroCode: error.response.data.errorCode
                        }
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}