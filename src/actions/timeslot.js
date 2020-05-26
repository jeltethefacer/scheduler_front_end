import Axios from "axios"

const baseUrl = 'http://localhost:3001/api/timeslot'

export const addTimeslot = (token, description, startTime, endTime, maxPeople, roles) => {
    return async dispatch => {
        try {
            const user = await Axios.post(`${baseUrl}`,
                {
                    description: description,
                    startTime: startTime,
                    endTime: endTime,
                    maxPeople: maxPeople,
                    roles: roles
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )
            const timeslotData = user.data

            setInterval(() => {
                dispatch({
                    type: "RESET_SUCCES_TIMESLOT"
                })
            }, 5000)

            //refresh user list
            dispatch({
                type: "ADD_TIMESLOT",
                data: {
                    timeslot: timeslotData
                }
            })
        } catch (error) {
            console.log(error)
            
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "TIMESLOT_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode
                        } 
                    })
                    break
                case 401:
                    dispatch({
                        type: "TIMESLOT_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode
                        }
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const getTimeslots = (token) => {
    return async dispatch => {
        try {
            const timeslots = await Axios.get(`${baseUrl}`,
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )
            const timeslotsData = timeslots.data

            //refresh user list
            dispatch({
                type: "TIMESLOT_LIST",
                data: {
                    timeslots: timeslotsData
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "VALIDATION_ERROR_TIMESLOT",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const subscribeTimeslot = (token, timeslotId) => {
    return async dispatch => {
        try {
            const timeslot = await Axios.post(`${baseUrl}/subscribe`,
                {
                    timeslotId: timeslotId
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )
            const timeslotData = timeslot.data

            //refresh user list
            dispatch({
                type: "SUBSCRIBED_TIMESLOT",
                data: {
                    timeslot: timeslotData
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "TIMESLOT_ERROR",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const unSubscribe = (token, timeslotId) => {
    return async dispatch => {
        try {
            const timeslot = await Axios.post(`${baseUrl}/unsubscribe`,
                {
                    timeslotId: timeslotId
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )
            const timeslotData = timeslot.data

            //unsubscribe redux is same as subscribe redux maybe change name in future?
            dispatch({
                type: "SUBSCRIBED_TIMESLOT",
                data: {
                    timeslot: timeslotData
                }
            })
        } catch (error) {
            console.log(error)
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "TIMESLOT_ERROR",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}

export const deleteTimeslot = (token, timeslotId) => {
    return async dispatch => {
        try {
            await Axios.post(`${baseUrl}/delete`,
                {
                    timeslotId: timeslotId
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )

            //unsubscribe redux is same as subscribe redux maybe change name in future?
            dispatch({
                type: "DELETE_TIMESLOT",
                data: {
                    timeslotId: timeslotId 
                }
            })
        } catch (error) {
            console.log(error)
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "TIMESLOT_ERROR",
                        data: error.response.data
                    })
                    break
                case 401:
                    dispatch({
                        type: "INVALID_TOKEN"
                    })
                    break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}