import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { errorCodeFormatting } from '../utils/errorCodeFormatting';
import { addTimeslotCategory, fetchOneTimeslotCategory, changeTimeslotCategory } from "../actions/timeslotCategorie"
import { useHistory } from 'react-router';

function TimeslotCategorieForm(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const timeslotCategoryState = useSelector(state => state.timeslotCategorie)
    const token = useSelector(state => state.login.token)

    //check if its a number or not in case it is not a number set it to undefined

    const timeslotCategoryId = props.match ? Number(props.match.params.timeslotCategorieId) ? Number(props.match.params.timeslotCategorieId) : undefined : undefined


    useEffect(() => {
        if(timeslotCategoryId) {
            dispatch(fetchOneTimeslotCategory(token, timeslotCategoryId))
            setApiCall(true)
        }
    }, [token, timeslotCategoryId, dispatch])


    let defaultState = {
        title: "",
        cancelLength: 24,
        subscribeLength: 0
    }


    //uses this state to set the default values for title etc 
    let [apiCall, setApiCall] = useState(false)
    let [title, setTitle] = useState(defaultState.title)
    let [cancelLength, setCancelLength] = useState(defaultState.cancelLength)
    let [subscribeLength, setSubscribeLength] = useState(defaultState.subscribeLength)

    //sets the state in case it is editing a existing timeslotcategorie
    if(apiCall && timeslotCategoryId && timeslotCategoryState.timeslotCategory && timeslotCategoryState.timeslotCategory.id === timeslotCategoryId) {
        setTitle(timeslotCategoryState.timeslotCategory.title)
        setCancelLength(timeslotCategoryState.timeslotCategory.cancelLength)
        setSubscribeLength(timeslotCategoryState.timeslotCategory.subscribeLength)
        setApiCall(false)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleCancelLengthChange = (event) => {
        if (event.target.value !== "") {
            setCancelLength(Number(event.target.value))
        } else {
            setCancelLength("")
        }
    }

    const handleSubscribeLengthChange = (event) => {
        if (event.target.value !== "") {
            setSubscribeLength(Number(event.target.value))
        } else {
            setSubscribeLength("")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!timeslotCategoryId) {
            dispatch(addTimeslotCategory(token, title, cancelLength, subscribeLength))
            setTitle("")
            setCancelLength(24)
        } else {
            console.log("handle", token)

            dispatch(changeTimeslotCategory(token, timeslotCategoryId, title, cancelLength, subscribeLength)) 
        }
    }


    const errorText = (errorCode) => {
        switch (errorCode) {
            case "TITLE_LENGTH_ERROR":
                return "The title should atleast be 3 charactert long"
            case "TIME_ERROR":
                return "cancel lenght cannot be greater than the subscribe time"
            case "SAVE_ERROR":
                return "The title should be longer than 3 characters"
            case "NOT_AUTHORIZED":
                return "You do not have the right role to edit timeslotcategories"
            default:
                return ""
        }
    }

    console.log(timeslotCategoryState)
    //resets the succes and redirect on a succesfull edit
    if(timeslotCategoryState.succes) {
        dispatch({type: "RESET_SUCCES_TIMESLOT_CATEGORY"})
        history.push("/moderator")
    } 

    return (
        <div>
            <h2>Add timelslotCategorie</h2>
            {errorCodeFormatting(timeslotCategoryState.errorCode, errorText)}
            < form onSubmit={handleSubmit} >
                title: <input type="text" value={title} onChange={handleTitleChange} /> <br />
                cancle length (hours): <input type="number" min={0} value={cancelLength} onChange={handleCancelLengthChange} /><br />
                subscribe length(hours): <input type="number" min={0} value={subscribeLength} onChange={handleSubscribeLengthChange} /><br />
                <input type="submit" />
            </form >
        </div>
    )
}

export default TimeslotCategorieForm
