import tokenRequest from "../utils/axiosInstance"

const baseUrl = `/api/timeslot`

export const addTimeslot = (token, description, startTime, endTime, maxPeople, roles, timeslotCategory) => {
    return async dispatch => {
        try {
            const timeslot = await tokenRequest(token).post(`${baseUrl}`,
                {
                    description: description,
                    startTime: startTime,
                    endTime: endTime,
                    maxPeople: maxPeople,
                    roles: roles,
                    timeslotCategory: timeslotCategory
                }
            )
            const timeslotData = timeslot.data

            setTimeout(() => {
                dispatch({
                    type: "RESET_SUCCES_TIMESLOT"
                })
            }, 5000)

            //refresh user list
            dispatch({
                type: "ADD_TIMESLOT",
                data: {
                    timeslot: timeslotData.timeslot
                }
            })
        } catch (error) {
            console.log(error.response)
            
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "TIMESLOT_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode,
                            errorInfo: error.response.data.errorInfo
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

export const getTimeslots = (token, timeOffSetParam = 5) => {
    return async dispatch => {
        try {
            const timeslots = await tokenRequest(token).get(baseUrl, {params: {timeOffSet: timeOffSetParam}})
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

export const getOneTimeslot = (token, timeslotId) => {
    return async dispatch => {
        try {
            const timeslots = await tokenRequest(token).get(`${baseUrl}/${timeslotId}`)
            const timeslotData = timeslots.data
            console.log(timeslotData)
            //refresh user list
            dispatch({
                type: "ONE_TIMESLOT",
                data: {
                    timeslot: timeslotData.timeslot
                }
            })
        } catch (error) {
            console.log(error)
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
                case 404:
                    dispatch({
                        type: "NO_TIMESLOT"
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


export const getUserTimeslots = (token) => {
    return async dispatch => {
        try {
            const timeslots = await tokenRequest(token).get(`${baseUrl}/user`)

            const timeslotsData = timeslots.data.timeslots
            //refresh user list
            dispatch({
                type: "GET_USER_TIMESLOTS",
                data: {
                    userTimeslots: timeslotsData
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400: 
                    dispatch({
                        type: "TIMESLOT_ERROR",
                        data: {
                            errorCode: error.response.date.errorCode
                        }
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
            const timeslot = await tokenRequest(token).put(`${baseUrl}/${timeslotId}/user`)
            const timeslotData = timeslot.data

            //refresh user list
            dispatch({
                type: "SUBSCRIBED_TIMESLOT",
                data: {
                    timeslot: timeslotData.timeslot
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
            const timeslot = await tokenRequest(token).delete(`${baseUrl}/${timeslotId}/user`)
            const timeslotData = timeslot.data

            //TODO: unsubscribe redux is same as subscribe redux maybe change name in future?
            dispatch({
                type: "SUBSCRIBED_TIMESLOT",
                data: {
                    timeslot: timeslotData.timeslot
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
            await tokenRequest(token).delete(`${baseUrl}/${timeslotId}`)

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