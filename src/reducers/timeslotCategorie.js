
const defaultState = {
    timeslotCategories: [],
    timeslotCategorie: null,
    errorCode: "",
    succes: false
}

const timeslotCategorieReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "ADD_TIMESLOT_CATEGORIE" :
            return { 
                ...state,
                timeslotCategories: state.timeslotCategories.concat(action.data.timeslotCategorie),
                succes: true,
                errorCode: ""
            }            
        case "TIMESLOT_CATEGORIE_LIST" :
            return {
                ...state,
                timeslotCategories: action.data.timeslotCategories,
            }
        case "CHANGE_TIMESLOT_CATEGORIE":
            const newTimeslotCategories = state.timeslotCategories.map((timeslotCategorie) => {
                if(timeslotCategorie.id === action.data.timeslotCategorie.id) {
                    return action.data.timeslotCategorie
                }
                return timeslotCategorie
            })
            return {
                timeslotCategories: newTimeslotCategories,
                timeslotCategorie: null,
                errorCode: "",
                succes: true
            }
        case "FETCH_ONE_TIMESLOT_CATEGORIE":
            return {
                ...state, 
                timeslotCategorie: action.data.timeslotCategorie
            }
        case "TIMESLOT_CATEGORIE_ERROR":
            return {
                ...state,
                errorCode: action.data.errorCode,
                succes: false
            }
        case "RESET_SUCCES_TIMESLOT_CATEGORIE" :
            return {
                ...state,
                succes: false,
                errorCode: ""
            }
        default:
            return state
    }
}
export default timeslotCategorieReducer