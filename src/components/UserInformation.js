import React, {useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import { getUserInformation } from "../actions/user"

function UserInformation() {
    const userinformation = useSelector(state => state.user.user)
    const userRoles = useSelector(state => state.user.roles)
    const token = useSelector(state => state.login.token)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUserInformation(token))
    }, [dispatch, token])

    const mapRoles = (roles) => {

        const roleListElements = roles.map((role) => 
            <li key={role.id} >{role.abreviation} ({role.description})</li>
        )
    
        return <ul>{roleListElements}</ul>
    }
    
    //renders only if there is userinformation
    if(userinformation) {
        return (
            <div>
                Email: {userinformation.email} 
                <hr />
                Hallo {userinformation.frontName} {userinformation.lastName},
                <br/>
                
                je rollen zijn
                {userRoles ? mapRoles(userRoles) : " loading"}

                Arthur {"<3"} 
            </div>
        )
    }

    //default return
    return (
        <div>Loading....</div>
    )
}

export default UserInformation