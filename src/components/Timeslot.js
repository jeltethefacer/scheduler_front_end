import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getOneTimeslot } from '../actions/timeslot';
import { getRoleList } from '../actions/role';


import { errorCodeFormatting } from '../utils/errorCodeFormatting';
import { getUserInformation } from '../actions/user';
import { getTimeslotCategoryList } from '../actions/timeslotCategorie';
import TimeslotCards from "./TimeslotCards"


function Timeslot(props) {
    const dispatch = useDispatch()

    const timeslot = useSelector(state => state.timeslot.timeslot)
    const roles = useSelector(state => state.roles)
    const userInformation = useSelector(state => state.user)
    const timeslotCategories = useSelector(state => state.timeslotCategorie.timeslotCategories)
    const timeslotStatus = useSelector(state => state.timeslot)
    const token = useSelector(state => state.login.token)

    const timeslotId = props.match ? Number(props.match.params.timeslotId) ? Number(props.match.params.timeslotId) : undefined : undefined

    useEffect(() => {
        console.log(timeslotId)

        if(timeslotId && token) {
            dispatch(getOneTimeslot(token, timeslotId))
            dispatch(getRoleList(token))
            dispatch(getUserInformation(token))
            dispatch(getTimeslotCategoryList(token))
        }
    }, [dispatch, token, timeslotId])

    const errorText = (errorCode, errorInfo = "") => {
        switch (errorCode) {
            case "TIMESLOT_FULL":
                return "time slot full please fuck off"
            case "NO_VALID_ROLE":
                return "you do not have the required role to subscribe to this timeslot please contact the moderator if you think this is an error."
            case "TIME_ERROR_UNSUBSCRIBE":
                return `The time to cancel your appointment has sadly passed contact the COMBAR in case you really can't tap you need to cancel atleast ${errorInfo} hours in advance`
            default:
                return <div></div>
        }
    }

    if (timeslot && roles.length !== 0 && timeslotCategories.length !== 0 && userInformation.user) {
        return (
            <div>
                {errorCodeFormatting(timeslotStatus.errorCode, errorText, timeslotStatus.errorInfo)}
                <TimeslotCards timeslots={[timeslot]} userRoles={userInformation.roles} categories={timeslotCategories} userId={userInformation.user.id} roleList={roles} token={token} singleCard={true}/>
            </div>
        )        
    }
    if(timeslotStatus.succes) {
        return (
            <div>timeslot with id {timeslotId} not found</div>
        )
    }
    return <div></div>
}

export default Timeslot