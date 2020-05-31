import Axios from "axios"

import { config } from "../utils/config"

const baseUrl = `${config().url}/api/timeslotCategorie`


export const addTimeslotCategorie = (token, title, cancelLength, subscribeLength) => {
    return async dispatch => {
        try {
            const timeslotCategorie = await Axios.post(`${baseUrl}`,
                {
                    title: title,
                    cancelLength: cancelLength,
                    subscribeLength: subscribeLength
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
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
            const timeslotCategorie = await Axios.get(`${baseUrl}`,
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )
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
            const timeslotCategorie = await Axios.get(`${baseUrl}/${categorieId}`,
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                }
            )
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
            const timeslotCategorie = await Axios.post(`${baseUrl}/change`,
                {
                    timeslotCategorieId: timeslotCategorieId,
                    title: title,
                    cancelLength: cancelLength,
                    subscribeLength: subscribeLength
                },
                {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
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