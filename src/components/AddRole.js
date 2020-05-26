import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addRole } from "../actions/moderator"


function AddUser() {
    const dispatch = useDispatch()

    const token = useSelector(state => state.login.token)


    const [abreviation, setAbreviation] = useState("")
    const [description, setDescription] = useState("")
    const handleAbreviationChange = (event) => {
        setAbreviation(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(addRole(token, abreviation, description))
        setAbreviation("")
        setDescription("")
    }
    return (
        < form onSubmit={handleSubmit} >
            abreviation: <input type="text" value={abreviation} onChange={handleAbreviationChange} /> <br />
            description: <input type="text" value={description} onChange={handleDescriptionChange} /><br />
            <input type="submit" />
        </form >
    )
}

export default AddUser