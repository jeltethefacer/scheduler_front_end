import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserInformation } from "../actions/user"
import { getUserTimeslots } from '../actions/timeslot';
import TimeslotCards from "./TimeslotCards"
import { getRoleList } from '../actions/role';
import { getTimeslotCategorieList } from '../actions/timeslotCategorie';
import UserInformation from './UserInformation';
function FrontPage() {
    const userInformation = useSelector(state => state.user)
    const token = useSelector(state => state.login.token)
    const userTimeslots = useSelector(state => state.timeslot.userTimeslots)
    const timeslotCategories = useSelector(state => state.timeslotCategorie.timeslotCategories)
    const roles = useSelector(state => state.roles)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUserInformation(token))
        dispatch(getUserTimeslots(token))
        dispatch(getTimeslotCategorieList(token))
        dispatch(getRoleList())
    }, [dispatch, token])

    //renders only if there is userinformation
    if (userInformation.user && userTimeslots) {
        console.log(userInformation)
        return (
            <div>
                <UserInformation userInformation={userInformation}/>

                <TimeslotCards timeslots={userTimeslots} userRoles={userInformation.roles.roles} categories={timeslotCategories} userId={userInformation.user.id} roleList={roles} sortingOption={"startTime"} token={token} />
            </div>
        )
    }

    //default return
    return (
        <div>Loading....</div>
    )
}

export default FrontPage