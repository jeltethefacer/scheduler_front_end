
const defaultState = {
    timeslotCategories: [],
    errorCode: "",
    succes: false
}

const timeslotCategorieReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "ADD_TIMESLOT_CATEGORIE" :
            return { 
                ...state,
                timeslotCategories: state.timeslotCategories.concat(action.data.timeslotCategorie),
                succes: true
            }            
        case "TIMESLOT_CATEGORIE_LIST" :
            return {
                ...state,
                timeslotCategories: action.data.timeslotCategories,
            }

        case "TIMESLOT_CATEGORIE_ERROR":
            return {
                ...state,
                errorCode: action.data.errorCode
            }
        case "RESET_SUCCES_TIMESLOT_CATEGORIE" :
            return {
                ...state,
                succes: true
            }
        default:
            return state
    }
}
export default timeslotCategorieReducer