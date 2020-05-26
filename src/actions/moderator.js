import Axios from "axios"

const baseUrl = 'http://localhost:3001/api/moderator'

export const getUsers = (token) => {
    return async dispatch => {
        try {
            const users = await Axios.get(`${baseUrl}/users`, {
                headers: {
                    "authorization": `bearer ${token}`
                }
            })

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
            const user = await Axios.post(`${baseUrl}/addUser`,
                {
                    email: email,
                    frontName: frontName,
                    lastName: lastName
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
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
            await Axios.post(`${baseUrl}/deleteUser`,
                {
                    userId: userId
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
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
            const role = await Axios.post(`${baseUrl}/addRole`,
                {
                    abreviation: abreviation,
                    description: description
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
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
        console.log('lamo')
        try {
            const toggleRoleRespone = await Axios.post(`${baseUrl}/toggleRole`,
                {
                    roleId: roleId,
                    userId: userId
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
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