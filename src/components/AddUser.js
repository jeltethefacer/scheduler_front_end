import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from "../actions/moderator"


function AddUser() {
    const dispatch = useDispatch()

    const token = useSelector(state => state.login.token)


    const [email, setEmail] = useState("")
    const [frontName, setFrontName] = useState("")
    const [lastName, setLastName] = useState("")
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleFrontNameChange = (event) => {
        setFrontName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(addUser(token, email, frontName, lastName))
        setFrontName("")
        setLastName("")
        setEmail("")
    }
    return (
        < form onSubmit={handleSubmit} >
            email: <input type="email" value={email} onChange={handleEmailChange} /> <br />
            front name: <input type="text" value={frontName} onChange={handleFrontNameChange} /><br />
            last name  <input type="text" value={lastName} onChange={handleLastNameChange} /><br />
            <input type="submit" />
        </form >
    )
}

export default AddUser