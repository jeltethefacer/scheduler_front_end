const moderatorReducer = (state = [], action) => {
    switch(action.type) {
        case "USERS_LIST" :
            return action.data.userList
        case "ADD_USER": 
            return state.concat(action.data.user)
        case "TOGGLE_ROLE":
            const newState = state.map(user => {
                console.log(user.id, action.data.user.id) 

                if(user.id === action.data.user.id) {
                    return action.data.user
                }
                return user
            })
            console.log(newState)
            return newState
        default:
            return state
    }
}
export default moderatorReducer