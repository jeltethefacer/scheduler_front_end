const defaultState = {
    loggedIn: false,
    pending: true
}


const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                token: action.data.token,
                loggedIn: true,
                pending: false
            }
        case "NO_TOKEN":
            return {
                loggedIn: false,
                pending: false
            }
        case "LOGOUT":
            return {
                loggedIn: false,
                error: false,
                pending: false
            }
        case "LOGIN_ERROR":
            console.log(action.data)
            return {
                loggedIn: false,
                error: true,
                errorCode: action.data.errorCode,
                pending: false
            }
        case "SERVER_ERROR":
            return {
                loggedIn: false,
                error: true,
                errorMessage: "The server may be down, try again later or try to contract the moderator.",
                pending: false
            }
        default:
            return state
    }
}

export default loginReducer