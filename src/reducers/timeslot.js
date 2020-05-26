
const defaultState = {
    timeslots: [],
    errorCode: "",
    succes: false
}

const timeslotReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "ADD_TIMESLOT" :
            return { 
                ...state,
                timeslots: state.timeslots.concat(action.data.timeslot),
                succes: true
            }
        case "TIMESLOT_LIST" :
            return {
                ...state,
                timeslots: action.data.timeslots
            }
        case "SUBSCRIBED_TIMESLOT":
            const newTimeslots = state.timeslots.map(timeslot => {
                if(timeslot.id === action.data.timeslot.id) {
                    return action.data.timeslot
                }
                return timeslot
            })
            return {
                ...state,
                timeslots: newTimeslots,
                errorCode: ""
            }
        case "DELETE_TIMESLOT": 
            const newTimeslotsDeleted = state.timeslots.filter(timeslot => {
                return timeslot.id !== action.data.timeslotId
            })
            return {
                ...state,
                timeslots: newTimeslotsDeleted,
                errorCode: ""
            }
        case "TIMESLOT_ERROR":
            return {
                ...state,
                errorCode: action.data.errorCode
            }
        case "RESET_SUCCES_TIMESLOT" :
            return {
                ...state,
                succes: false
            }
        default:
            return state
    }
}
export default timeslotReducer