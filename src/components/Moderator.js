import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUserInformation } from "../actions/user"

import UserInformation from "./UserInformation"
import UserList from "./UserList"

function Moderator() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.login.token)

    useEffect(() => {
        dispatch(getUserInformation(token))
    }, [dispatch, token])



    return (
        <div>
            <UserInformation/>
            <UserList/>
        </div>
    )
}

export default Moderator