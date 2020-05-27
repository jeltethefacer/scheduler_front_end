import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { errorCodeFormatting } from '../utils/errorCodeFormatting';
import {addTimeslotCategorie} from "../actions/timeslotCategorie"

function TimeslotCategorieForm() {
    const dispatch = useDispatch()

    const timeslotCategorieState = useSelector(state => state.timeslotCategorie)
    const token = useSelector(state => state.login.token)

    const [title, setTitle] = useState("")
    const [cancelLength, setCancelLength] = useState(24)

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleCancelLengthChange = (event) => {
        setCancelLength(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(addTimeslotCategorie(token, title, cancelLength))
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
            {errorCodeFormatting(timeslotCategorieState.errorCode, errorText)}
            < form onSubmit={handleSubmit} >
            title: <input type="text" value={title} onChange={handleTitleChange} /> <br />
            cancle length (hours): <input type="number" min={0} value={cancelLength} onChange={handleCancelLengthChange} /><br />
            <input type="submit" />
        </form >
        </div>
    )
}

export default TimeslotCategorieForm