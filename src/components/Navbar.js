import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserInformation } from "../actions/user"
import { Link } from 'react-router-dom';
import { checkRole} from "../utils/checkRole"

import {changeLanguage} from "../actions/l18n"

import "../css/navbar.css"
import { languageContext } from '../App';


function Navbar() {
    const loginInformation = useSelector(state => state.login)
    const translation = useContext(languageContext)

    const userRoles = useSelector(state => state.user.roles)
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.login.token)
    const language= useSelector(state => state.l18n.language)

    const dispatch = useDispatch()

    const loginOrLogout = (loggedIn, translation) =>{
        return loggedIn ? <Link to="/logout" className={"navbar_link"}>{translation.logout}</Link> : <Link to="/login" className={"navbar_link"}>{translation.login}</Link>
    }


    const moderatorLink = (userRoles, translation) => {
        if(checkRole(userRoles, "userModerator")) {
            return <li className={"navbar_list_element"}><Link to="/moderator" className={"navbar_link"}>{translation.moderator}</Link></li>
        }
    }

    const timeslotLink = (userRoles, chairman, translation) => {
        if(checkRole(userRoles, "createTimeslot") || (chairman && chairman.length !== 0)) {
        return <li className={"navbar_list_element"}><Link to="/timeslot/create" className={"navbar_link"}>{translation.createTimeslot}</Link></li>
        }
    }

    const multipleTimeslotLink = (userRoles, chairman, translation) => {
        if(checkRole(userRoles, "createTimeslot") || (chairman && chairman.length !== 0)) {
        return <li className={"navbar_list_element"}><Link to="/timeslot/create/multiple" className={"navbar_link"}>{translation.createMultipleTimeslot}</Link></li>
        }
    }


    useEffect(() => {
        if (token) {
            dispatch(getUserInformation(token))
        }
    }, [dispatch, token])

    const onChangeLanguageClick  = (currentLanguage) =>{
        currentLanguage === "english" ? dispatch(changeLanguage("dutch")) : dispatch(changeLanguage("english"))

    }

    //renders only if there is userinformation
    return (
        <ul className={"navbar_list"}>
            <li className={"navbar_list_element"}><Link to="/" className={"navbar_link"}>{translation.home}</Link></li>
            <li className={"navbar_log_element"}> {loginOrLogout(loginInformation.loggedIn, translation)} </li>
            <li className={"navbar_log_element"} onClick={()=> onChangeLanguageClick(language)}><div className={"navbar_link"}>{translation.otherLanguage}</div></li>
            {loginInformation.loggedIn? moderatorLink(userRoles, translation) : ""}
            {loginInformation.loggedIn? user ? timeslotLink(userRoles, user.chairman, translation) : "" : ""}
            {loginInformation.loggedIn? user ? multipleTimeslotLink(userRoles, user.chairman, translation) : "" : ""}

            {loginInformation.loggedIn? <li className={"navbar_list_element"}><Link to="/timeslot" className={"navbar_link"}>{translation.timeslots}</Link></li> : ""}
        </ul>
    )
}

export default Navbar
