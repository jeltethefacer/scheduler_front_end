const roleReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_ROLE" :
            return state.concat(action.data.role)
        case "ROLE_LIST" :
            return action.data.roles
        default:
            return state
    }
}
export default roleReducer