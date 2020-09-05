const moderatorReducer = (state = [], action) => {
    switch(action.type) {
        case "USERS_LIST" :
            console.log(action.data.userList)

            return action.data.userList
        case "ADD_USER": 
            return state.concat(action.data.user)
        case "TOGGLE_CHAIRMAN":
        case "TOGGLE_ROLE":
            const newState = state.map(user => {

                if(user.id === action.data.user.id) {
                    console.log(action.data.user.id, user.id)
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