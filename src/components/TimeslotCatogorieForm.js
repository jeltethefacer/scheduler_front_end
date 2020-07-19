import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { errorCodeFormatting } from '../utils/errorCodeFormatting';
import { addTimeslotCategorie, fetchOneTimeslotCategorie, changeTimeslotCategorie } from "../actions/timeslotCategorie"
import { useHistory } from 'react-router';

function TimeslotCategorieForm(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const timeslotCategorieState = useSelector(state => state.timeslotCategorie)
    const token = useSelector(state => state.login.token)

    const timeslotCategorieId = props.match ? props.match.params.timeslotCategorieId : undefined

    useEffect(() => {
        if(timeslotCategorieId) {
            dispatch(fetchOneTimeslotCategorie(token, timeslotCategorieId))
            setApiCall(true)
        }
    }, [token, timeslotCategorieId, dispatch])


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
    if(apiCall && timeslotCategorieId && timeslotCategorieState.timeslotCategorie && timeslotCategorieState.timeslotCategorie.id === timeslotCategorieId) {
        setTitle(timeslotCategorieState.timeslotCategorie.title)
        setCancelLength(timeslotCategorieState.timeslotCategorie.cancelLength)
        setSubscribeLength(timeslotCategorieState.timeslotCategorie.subscribeLength)
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
        if(!timeslotCategorieId) {
            dispatch(addTimeslotCategorie(token, title, cancelLength, subscribeLength))
            setTitle("")
            setCancelLength(24)
        } else {
            dispatch(changeTimeslotCategorie(token, timeslotCategorieId, title, cancelLength, subscribeLength)) 
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


    //resets the succes and redirect on a succesfull edit
    if(timeslotCategorieState.succes) {
        dispatch({type: "RESET_SUCCES_TIMESLOT_CATEGORIE"})
        history.push("/moderator")
    } 

    return (
        <div>
            <h2>Add timelslotCategorie</h2>
            {errorCodeFormatting(timeslotCategorieState.errorCode, errorText)}
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
