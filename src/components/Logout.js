import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { logout } from "../actions/login"
import { useHistory } from 'react-router';

function Logout() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(logout())
        history.push("/")
    }, [dispatch, history])

    return (
        <div>logout</div>
    )
}

export default Logout