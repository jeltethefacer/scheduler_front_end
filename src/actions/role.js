import Axios from "axios"

const baseUrl = 'http://localhost:3001/api/role'

export const getRoleList = () => {
    return async dispatch => {
        try {
            const roles = await Axios.get(`${baseUrl}`)

            const rolesList = roles.data
            dispatch({
                type: "ROLE_LIST",
                data: {
                    roles: rolesList
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