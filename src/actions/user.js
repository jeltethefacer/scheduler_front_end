import Axios from "axios"
import {config} from "../utils/config"

const baseUrl = `${config().url}/api/user`

export const getUserInformation = (token) => {
    return async dispatch => {
        try {
            const user = await Axios.get(baseUrl, {
                headers: {
                    "authorization": `bearer ${token}`
                }
            })

            const userData = user.data
            
            dispatch({
                type: "USER_INFORMATION",
                data: {
                    user: userData
                }
            })
        } catch (error) {
            console.log(error.response.status)
            switch(error.response.status) {
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