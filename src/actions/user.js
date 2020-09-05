import tokenRequest from "../utils/axiosInstance"

export const getUserInformation = (token) => {
    return async dispatch => {
        try {
            const apiResponse = await tokenRequest(token).get("/api/user")

            const responseData = apiResponse.data
            console.log(responseData.user)
            dispatch({
                type: "USER_INFORMATION",
                data: {
                    user: responseData.user,
                    roles: responseData.roles
                }
            })
        } catch (error) {
            console.log(error)
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