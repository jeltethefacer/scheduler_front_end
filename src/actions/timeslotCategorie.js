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
            const categoriesEtity = timeslotCategorie.data

            //refresh user list
            dispatch({
                type: "TIMESLOT_CATEGORIE_LIST",
                data: {
                    timeslotCategories: categoriesEtity
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