import tokenRequest from "../utils/axiosInstance"
const baseUrl = `/api/timeslotCategorie`


export const addTimeslotCategorie = (token, title, cancelLength, subscribeLength) => {
    return async dispatch => {
        try {
            const timeslotCategorie = await tokenRequest(token).post(`${baseUrl}`,
                {
                    title: title,
                    cancelLength: cancelLength,
                    subscribeLength: subscribeLength
                }
            )
            const categorieEntity = timeslotCategorie.data

            //refresh user list
            dispatch({
                type: "ADD_TIMESLOT_CATEGORIE",
                data: {
                    timeslotCategorie: categorieEntity
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400:
                    dispatch({
                        type: "TIMESLOT_CATEGORIE_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode
                        }
                    })
                    break
                case 401:
                    dispatch({
                        type: "TIMESLOT_CATEGORIE_VALIDATION_ERROR"
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

export const getTimeslotCategorieList = (token) => {
    return async dispatch => {
        try {
            const timeslotCategorie = await tokenRequest(token).get(baseUrl)
            const categoriesEntity = timeslotCategorie.data

            //refresh user list
            dispatch({
                type: "TIMESLOT_CATEGORIE_LIST",
                data: {
                    timeslotCategories: categoriesEntity
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400:
                case 401:
                    dispatch({
                        type: "TIMESLOT_CATEGORIE_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode

                        }
                    })
                    break
                // case 401:
                //     dispatch({
                //         type: "TIMESLOT_CATEGORIE_VALIDATION_ERROR"
                //     })
                //     break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}


export const fetchOneTimeslotCategorie = (token, categorieId) => {
    return async dispatch => {
        try {
            const timeslotCategorie = await tokenRequest(token).get(`${baseUrl}/${categorieId}`)
            const categorieEntity = timeslotCategorie.data.timeslotCategorie
            //refresh user list
            dispatch({
                type: "FETCH_ONE_TIMESLOT_CATEGORIE",
                data: {
                    timeslotCategorie: categorieEntity
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400:
                    dispatch({
                        type: "TIMESLOT_CATEGORIE_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode

                        }
                    })
                    break
                case 401:
                    dispatch({
                        type: "TIMESLOT_CATEGORIE_VALIDATION_ERROR"
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

export const changeTimeslotCategorie = (token, timeslotCategorieId, title, cancelLength, subscribeLength) => {
    return async dispatch => {
        try {
            const timeslotCategorie = await tokenRequest(token).post(`${baseUrl}/change`,
                {
                    timeslotCategorieId: timeslotCategorieId,
                    title: title,
                    cancelLength: cancelLength,
                    subscribeLength: subscribeLength
                }
            )
            const categorieEntity = timeslotCategorie.data.timeslotCategorie

            //refresh user list
            dispatch({
                type: "CHANGE_TIMESLOT_CATEGORIE",
                data: {
                    timeslotCategorie: categorieEntity
                }
            })
        } catch (error) {
            switch (error.response.status) {
                case 401:
                case 400:
                    dispatch({
                        type: "TIMESLOT_CATEGORIE_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode
                        }
                    })
                    break
                // case 401:
                //     dispatch({
                //         type: "TIMESLOT_CATEGORIE_VALIDATION_ERROR"
                //     })
                //     break
                default:
                    dispatch({
                        type: "SERVER_ERROR"
                    })
                    break
            }
        }
    }
}