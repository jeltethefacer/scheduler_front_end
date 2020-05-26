import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserInformation } from "../actions/user"
import { Link } from 'react-router-dom';
import { checkRole} from "../utils/checkRole"

import "../css/navbar.css"


function Navbar() {

    const loginInformation = useSelector(state => state.login)


    const userRoles = useSelector(state => state.user.roles)
    const token = useSelector(state => state.login.token)
    const dispatch = useDispatch()

    const loginOrLogout = (loggedIn) =>{
        return loggedIn ? <Link to="/logout" className={"navbar_link"}>logout</Link> : <Link to="/login" className={"navbar_link"}>login</Link>
    }


    const moderatorLink = (userRoles) => {
        if(checkRole(userRoles, "userModerator")) {
            return <li className={"navbar_list_element"}><Link to="/moderator" className={"navbar_link"}>moderator</Link></li>
        }
    }

    const timeslotLink = (userRoles) => {
        if(checkRole(userRoles, "createTimeslots")) {
            return <li className={"navbar_list_element"}><Link to="/timeslot/create" className={"navbar_link"}>create Timeslot</Link></li>
        }
    }


    useEffect(() => {
        if (token) {
            dispatch(getUserInformation(token))
        }
    }, [dispatch, token])


    //renders only if there is userinformation

    return (
        <ul className={"navbar_list"}>
            <li className={"navbar_list_element"}><Link to="/" className={"navbar_link"}>home </Link></li>
            <li className={"navbar_log_element"}> {loginOrLogout(loginInformation.loggedIn)} </li>
            {loginInformation.loggedIn? moderatorLink(userRoles) : ""}
            {loginInformation.loggedIn? timeslotLink(userRoles) : ""}
            {loginInformation.loggedIn? <li className={"navbar_list_element"}><Link to="/timeslot" className={"navbar_link"}>timeslots</Link></li> : ""}
        </ul>
    )



}

export default Navbar