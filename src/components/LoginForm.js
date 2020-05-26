import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../actions/login"
import { useHistory } from 'react-router';
import { errorCodeFormatting } from '../utils/errorCodeFormatting';

function LoginForm() {
    const dispatch = useDispatch()

    const errorCode = useSelector(state => state.login.errorCode)

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(login(email, password))
        history.push("/")
        setPassword("")
        setEmail("")
    }


    const errorText = (errorCode) => {
        switch (errorCode) {
            case "INVALID_EMAIL_OR_PASS":
                return "The email or password appear to be incorrect."
            default:
                return ""
        }
    }

 
    return (
        <div>
            {errorCodeFormatting(errorCode, errorText)}
            < form onSubmit={handleSubmit} >
            email: <input type="email" value={email} onChange={handleEmailChange} /> <br />
      password: <input type="password" value={password} onChange={handlePasswordChange} /><br />
            <input type="submit" />
        </form >
        </div>
    )
}

export default LoginForm