import tokenRequest from "../utils/axiosInstance"
const baseUrl = `/api/timeslotCategory`


export const addTimeslotCategory = (token, title, cancelLength, subscribeLength) => {
    return async dispatch => {
        try {
            const timeslotCategory = await tokenRequest(token).post(`${baseUrl}`,
                {
                    title: title,
                    cancelLength: cancelLength,
                    subscribeLength: subscribeLength
                }
            )
            const categoryEntity = timeslotCategory.data

            //refresh user list
            dispatch({
                type: "ADD_TIMESLOT_CATEGORY",
                data: {
                    timeslotCategory: categoryEntity
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400:
                    dispatch({
                        type: "TIMESLOT_CATEGORY_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode
                        }
                    })
                    break
                case 401:
                    dispatch({
                        type: "TIMESLOT_CATEGORY_VALIDATION_ERROR"
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

export const getTimeslotCategoryList = (token) => {
    return async dispatch => {
        try {
            const timeslotCategory = await tokenRequest(token).get(baseUrl)
            const categoriesEntity = timeslotCategory.data

            //refresh user list
            dispatch({
                type: "TIMESLOT_CATEGORY_LIST",
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
                        type: "TIMESLOT_CATEGORY_ERROR",
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


export const fetchOneTimeslotCategory = (token, categoryId) => {
    return async dispatch => {
        try {
            const timeslotCategory = await tokenRequest(token).get(`${baseUrl}/${categoryId}`)
            const categoryEntity = timeslotCategory.data.timeslotCategory
            //refresh user list
            dispatch({
                type: "FETCH_ONE_TIMESLOT_CATEGORY",
                data: {
                    timeslotCategory: categoryEntity
                }
            })
        } catch (error) {
            console.log(error.response.data)
            switch (error.response.status) {
                case 400:
                    dispatch({
                        type: "TIMESLOT_CATEGORY_ERROR",
                        data: {
                            errorCode: error.response.data.errorCode

                        }
                    })
                    break
                case 401:
                    dispatch({
                        type: "TIMESLOT_CATEGORY_VALIDATION_ERROR"
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

export const changeTimeslotCategory = (token, timeslotCategoryId, title, cancelLength, subscribeLength) => {
    return async dispatch => {
        try {
            const timeslotCategorie = await tokenRequest(token).post(`${baseUrl}/change`,
                {
                    timeslotCategoryId: timeslotCategoryId,
                    title: title,
                    cancelLength: cancelLength,
                    subscribeLength: subscribeLength
                }
            )
            const categoryEntity = timeslotCategorie.data.timeslotCategory
            //refresh user list
            dispatch({
                type: "CHANGE_TIMESLOT_CATEGORY",
                data: {
                    timeslotCategory: categoryEntity
                }
            })
        } catch (error) {
            console.log(error)
            switch (error) {
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