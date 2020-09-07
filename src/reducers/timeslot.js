
const defaultState = {
    timeslot: null,
    timeslots: [],
    errorCode: "",
    succes: false,
    errorInfo: "",
    userTimeslots: [],
    
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
        case "GET_USER_TIMESLOTS":
            return {
                ...state,
                userTimeslots: action.data.userTimeslots
            }
        case "NO_TIMESLOT":
            return {
                ...state,
                succes: true
            }
        case "ONE_TIMESLOT":
            console.log(action)
            return {
                ...state,
                timeslot: action.data.timeslot,
                succes: true
            }
        case "SUBSCRIBED_TIMESLOT":
            
            console.log(action.data)

            const newTimeslots = state.timeslots.map(timeslot => {
                if(timeslot.id === action.data.timeslot.id) {
                    return action.data.timeslot
                }
                return timeslot
            })
            var newTimeslot = state.timeslot
            if(state.timeslot && state.timeslot.id === action.data.timeslot.id) {
                newTimeslot = action.data.timeslot
            }

            return {
                ...state,
                timeslots: newTimeslots,
                timeslot: newTimeslot,
                errorCode: ""
            }
        case "DELETE_TIMESLOT": 
            const newTimeslotsDeleted = state.timeslots.filter(timeslot => {
                return timeslot.id !== action.data.timeslotId
            })

            var newTimeslotDeleted = state.timeslot
            if(state.timeslot && state.timeslot.id === action.data.timeslotId) {
                newTimeslot = null
            }

            return {
                ...state,
                timeslots: newTimeslotsDeleted,
                timeslot: newTimeslotDeleted,
                errorCode: ""
            }
        case "TIMESLOT_ERROR":
            return {
                ...state,
                errorCode: action.data.errorCode,
                errorInfo: action.data.errorInfo
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