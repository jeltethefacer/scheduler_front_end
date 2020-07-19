import tokenRequest from "../utils/axiosInstance"

export const getUserInformation = (token) => {
    return async dispatch => {
        try {
            const user = await tokenRequest(token).get("/api/user")

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