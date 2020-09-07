import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTimeslots } from '../../actions/timeslot';
import { getRoleList } from '../../actions/role';


import { errorCodeFormatting } from '../../utils/errorCodeFormatting';
import { getUserInformation } from '../../actions/user';
import { getTimeslotCategoryList } from '../../actions/timeslotCategorie';
import TimeslotCards from "../TimeslotCards"
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {findById} from "../../utils/findById"

function TimeslotList() {
    const dispatch = useDispatch()

    const timeslots = useSelector(state => state.timeslot.timeslots)
    const roles = useSelector(state => state.roles)
    const userInformation = useSelector(state => state.user)
    const timeslotCategories = useSelector(state => state.timeslotCategorie.timeslotCategories)
    const timeslotStatus = useSelector(state => state.timeslot)
    const token = useSelector(state => state.login.token)


    useEffect(() => {
        if (token) {
            dispatch(getTimeslots(token))

            dispatch(getRoleList(token))
            dispatch(getUserInformation(token))
            dispatch(getTimeslotCategoryList(token))
        }
    }, [dispatch, token])

    const sortOptions = [
        {
            value: "startTime",
            name: "start tijd"
        },
        {
            value: "endTime",
            name: "eind tijd"
        },
        {
            value: "usersRising",
            name: "hoeveelheid aangemeld stijdend"
        },
        {
            value: "usersDecreasing",
            name: "hoeveelheid aangemeld dalend"
        }
    ]

    const [sortOption, setSortOption] = useState(sortOptions[0].value)

    const onSelectSortChange = (event) => {
        setSortOption(event.target.value)
    }

    const errorText = (errorCode, errorInfo = "") => {
        switch (errorCode) {
            case "TIMESLOT_FULL":
                return "time slot is full"
            case "NO_VALID_ROLE":
                return "you do not have the required role to subscribe to this timeslot please contact the moderator if you think this is an error."
            case "TIME_ERROR_UNSUBSCRIBE":
                return `The time to cancel your appointment has sadly passed contact the COMBAR or Chairman in case you really can't make it. you need to cancel atleast ${errorInfo} hours in advance`

            default:
                return <div></div>
        }
    }

    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };


    

    if (timeslots && roles.length !== 0 && timeslotCategories.length !== 0 && userInformation.user) {
        const groupedTimeslots = groupBy(timeslots, "timeslotCategory")
        return (
            <div>
                <select onChange={onSelectSortChange} value={sortOption}>
                    {sortOptions.map((option) => {
                        return <option key={option.value} value={option.value}>{option.name}</option>
                    })}
                </select>
                {errorCodeFormatting(timeslotStatus.errorCode, errorText, timeslotStatus.errorInfo)}
                
                {
                    Object.keys(groupBy(timeslots, "timeslotCategory")).map((timeslotCategorieId) => {
                        return <ExpansionPanel key={timeslotCategorieId}>
                            <ExpansionPanelSummary
                                id={`${timeslotCategorieId}_panel`}
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography variant="h5" component="h2">
                                    { findById(timeslotCategorieId, timeslotCategories).title}
                                </Typography>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <TimeslotCards timeslots={groupedTimeslots[timeslotCategorieId]} userRoles={userInformation.roles} categories={timeslotCategories} userId={userInformation.user.id} roleList={roles} sortingOption={sortOption} token={token} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    })
                }
            </div>
        )
    }
    return <div></div>
}

export default TimeslotList