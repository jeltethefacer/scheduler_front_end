const defaultState = {
    user: null,
    role: []
}

const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "USER_INFORMATION":
            const user = action.data.user
            return {
                user: {
                    email: user.email,
                    frontName: user.frontName,
                    lastName: user.lastName,
                    id: user.id,
                    chairman: user.chairman
                },
                roles: user.roles
            }
        case "LOGOUT":
            return {
                user: null,
                role: []
            }
        default: 
            return state
    }
}

export default userReducer