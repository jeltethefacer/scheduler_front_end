import Axios from "axios"
import { config } from "../utils/config"

const baseUrl = `${config().url}/api/user/login`

export const login = (email, password) => {
    return async dispatch => {
        try {
            const user = await Axios.post(baseUrl, { email: email, password: password })
            const userData = user.data
            localStorage.setItem("token", userData.token)
            dispatch({
                type: "LOGIN",
                data: {
                    email: userData.email,
                    token: userData.token
                }
            })
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    dispatch({
                        type: "LOGIN_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode
                        }
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

export const verifyToken = (token) => {

    return async dispatch => {
        try {
            await Axios.post(`${baseUrl}/verify`,
                {},
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )

            dispatch({
                type: "LOGIN",
                data: {
                    token: token
                }
            })
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    localStorage.clear()
                    dispatch({
                        type: "NO_TOKEN"
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

export const logout = () => {
    localStorage.clear()
    return {
        type: "LOGOUT"
    }
}

export const noTokenStorage = () => {
    console.log("no storage")
    return {
        type: "NO_TOKEN"
    }
}