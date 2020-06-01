const defaultState = {
    language: "dutch"
}

const l18nReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "CHANGE_LANGUAGE" :
            return {
                language: action.data.language
            }
        default:
            return state
    }
}
export default l18nReducer