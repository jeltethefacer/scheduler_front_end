import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { errorCodeFormatting } from '../utils/errorCodeFormatting';
import { addTimeslotCategorie } from "../actions/timeslotCategorie"

function TimeslotCategorieForm() {
    const dispatch = useDispatch()

    const timeslotCategorieState = useSelector(state => state.timeslotCategorie)
    const token = useSelector(state => state.login.token)

    const [title, setTitle] = useState("")
    const [cancelLength, setCancelLength] = useState(24)
    const [subscribeLength, setSubscribeLength] = useState(0)

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
        console.log(title, cancelLength, subscribeLength)
        dispatch(addTimeslotCategorie(token, title, cancelLength, subscribeLength))
        setTitle("")
        setCancelLength(24)
    }


    const errorText = (errorCode) => {
        switch (errorCode) {
            case "TITLE_LENGTH_ERROR":
                return "The title appears to be of incorrect length"
            default:
                return ""
        }
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