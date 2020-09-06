
const defaultState = {
    timeslotCategories: [],
    timeslotCategory: null,
    errorCode: "",
    succes: false
}

const timeslotCategoryReducer = (state = defaultState, action) => {
    
    switch(action.type) {
        case "ADD_TIMESLOT_CATEGORY" :
            return { 
                ...state,
                timeslotCategories: state.timeslotCategories.concat(action.data.timeslotCategory),
                succes: true,
                errorCode: ""
            }            
        case "TIMESLOT_CATEGORY_LIST" :
            return {
                ...state,
                timeslotCategories: action.data.timeslotCategories,
            }
        case "CHANGE_TIMESLOT_CATEGORY":
            const newTimeslotCategories = state.timeslotCategories.map((timeslotCategory) => {
                if(timeslotCategory.id === action.data.timeslotCategory.id) {
                    return action.data.timeslotCategory
                }
                return timeslotCategory
            })
            return {
                timeslotCategories: newTimeslotCategories,
                timeslotCategory: null,
                errorCode: "",
                succes: true
            }
        case "FETCH_ONE_TIMESLOT_CATEGORY":
            return {
                ...state, 
                timeslotCategory: action.data.timeslotCategory
            }
        case "TIMESLOT_CATEGORY_ERROR":
            return {
                ...state,
                errorCode: action.data.errorCode,
                succes: false
            }
        case "RESET_SUCCES_TIMESLOT_CATEGORY" :
            return {
                ...state,
                succes: false,
                errorCode: ""
            }
        default:
            return state
    }
}
export default timeslotCategoryReducer