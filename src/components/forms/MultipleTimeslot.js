import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTimeslot } from "../../actions/timeslot"

import { toTimeString } from "../../utils/timeFormat"
import { errorCodeFormatting } from "../../utils/errorCodeFormatting"

import { getRoleList } from '../../actions/role';

import { Alert } from "@material-ui/lab"
import { getTimeslotCategoryList } from '../../actions/timeslotCategorie';
import { getUserInformation } from '../../actions/user';
import { checkRole } from '../../utils/checkRole';

function MultipleTimeslotForm() {
    const token = useSelector(state => state.login.token)
    const roles = useSelector(state => state.roles)
    const userRoles = useSelector(state => state.user.roles)
    const user = useSelector(state => state.user.user)

    const timeslotCategories = useSelector(state => state.timeslotCategorie.timeslotCategories)
    const errorCode = useSelector(state => state.timeslot.errorCode)
    const successTimeslot = useSelector(state => state.timeslot.succes)


    const [description, setDescription] = useState("")
    const [startTime, setStarttime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [maxPeople, setMaxPeople] = useState(1)
    const [roleSelection, setRoleSelection] = useState([])
    const [daySelection, setDaySelection] = useState([])
    const [weekSelection, setWeekSelection] = useState([])


    const [categorieSelection, setCategorieSelection] = useState("")




    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoleList())
        dispatch(getTimeslotCategoryList(token))
        dispatch(getUserInformation(token))
    }, [dispatch, token])

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleStartTimeTimeChange = (event) => {
        let timeSplitted = event.target.value.split(":")
        let tempDate = new Date(startTime.getTime())

        if (event.target.value !== "") {

            tempDate.setHours(timeSplitted[0])
            tempDate.setMinutes(timeSplitted[1])
            tempDate.setSeconds(0)
            // if the new date start time is later than the end time change the end time to the start time
            if (tempDate >= new Date(endTime.getTime())) {
                setEndTime(tempDate)
            }
            setStarttime(tempDate)
        }


    }

    const handleEndTimeTimeChange = (event) => {

        let timeSplitted = event.target.value.split(":")
        let tempDate = new Date(endTime.getTime())

        if (event.target.value !== "") {
            tempDate.setHours(timeSplitted[0])
            tempDate.setMinutes(timeSplitted[1])
            tempDate.setSeconds(0)

            setEndTime(tempDate)
        }
    }

    const handleMaxPeople = (event) => {
        setMaxPeople(event.target.value)
    }

    const handleRoleSelectionChange = (event) => {
        const roleToSelect = event.target.value

        if (roleSelection.includes(roleToSelect)) {
            setRoleSelection(roleSelection.filter(role => role !== roleToSelect))
        } else {
            setRoleSelection(roleSelection.concat(event.target.value))
        }
    }

    const handleDaySelectionChange = (event) => {
        const selectedDay = Number(event.target.value)

        if (daySelection.includes(selectedDay)) {
            setDaySelection(daySelection.filter(day => day !== selectedDay))
        } else {
            setDaySelection(daySelection.concat(selectedDay))
        }
    }

    const handleWeekSelectionChange = (event) => {
        const selectedWeek = Number(event.target.value)

        if (weekSelection.includes(selectedWeek)) {
            setWeekSelection(weekSelection.filter(week => week !== selectedWeek))
        } else {
            setWeekSelection(weekSelection.concat(selectedWeek))
        }
    }

    const handleCategorieSelectionChange = (event) => {
        setCategorieSelection(event.target.value)
    }

    const handleSubmit = (event) => {
        //if the categorie is not changed set the first categorie in the list
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        currentDate.setHours(0)
        currentDate.setMinutes(0)
        currentDate.setSeconds(0)
        currentDate.setMilliseconds(0)

        daySelection.sort()
        weekSelection.forEach(week => {
            let date = new Date(currentDate.getTime() + week * 7 * 24 * 60 * 60 * 1000)

            daySelection.forEach(day => {
                const thisDate = (date.getTime() + day * 24 * 60 * 60 * 1000)

                const startTimeTemp = new Date(thisDate)
                const endTimeTemp = new Date(thisDate)

                startTimeTemp.setHours(startTime.getHours())
                startTimeTemp.setMinutes(startTime.getMinutes())

                endTimeTemp.setHours(endTime.getHours())
                endTimeTemp.setMinutes(endTime.getMinutes())
                console.log("send it")
                if (categorieSelection === "" && !categorieSelection) {
                    dispatch(addTimeslot(token,
                        description, startTimeTemp, endTimeTemp,
                        maxPeople, roleSelection, timeslotCategories[0].id))
                } else {
                    dispatch(addTimeslot(token, description, startTimeTemp, endTimeTemp, maxPeople, roleSelection, categorieSelection))
                }
            })
        })
        event.preventDefault()

    }

    const errorText = (errorCode) => {
        switch (errorCode) {
            case "NOT_AUTHORIZED":
                return "You are not not authorized to create timeslot"
            case "NO_ROLES_ERROR":
                return "You have not selected any roles for the timeslot please select one"
            case "START_GREATER_END_TIME_ERROR":
                return "The start time is earlier than the end time."
            default:
                return ""
        }
    }

    const successFormatting = (success) => {
        if (success) {
            return <Alert severity="success">This is a success alert — check it out!</Alert>
        }
        return;
    }

    const findRoleById = (rolesArray, roleId) => {
        return rolesArray.filter(role => role.id === roleId)[0]
    }

    //do not delete
    const startTimeTimeString = toTimeString(startTime)

    const endTimeTimeString = toTimeString(endTime)

    let chooseRoles = roles.map(role => role.id)
    if (!checkRole(userRoles, "createTimeslot")) {
        if (user) {
            chooseRoles = user.chairman
        } else {
            chooseRoles = []
        }
    }

    const getWeekString = (week) => {
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let beginWeek = new Date(currentDate.getTime() + week * 7 * 24 * 60 * 60 * 1000)
        let endweek = new Date(currentDate.getTime() + (week + 1) * 6 * 24 * 60 * 60 * 1000)

        return (`${months[beginWeek.getMonth()]}, ${beginWeek.getDate()} - ${months[endweek.getMonth()]}, ${endweek.getDate()}`)
    }

    const dayArray = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]

    if (roles.length !== 0 && timeslotCategories !== 0) {
        return (
            <div>
                {errorCodeFormatting(errorCode, errorText)}
                {successFormatting(successTimeslot)}
                < form onSubmit={handleSubmit} >
                    <select value={daySelection} onChange={handleDaySelectionChange} multiple={true}>
                        {
                            [0, 1, 2, 3, 4, 5, 6].map((day) => {
                                return <option key={day} value={day}>{dayArray[day]}</option>
                            })
                        }
                    </select>
                    <br />

                    <select value={weekSelection} onChange={handleWeekSelectionChange} multiple={true}>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7].map(week => {
                                return <option key={week} value={week}>{getWeekString(week)}</option>
                            })
                        }
                    </select>
                    <br />

                    description: <input type="text" value={description} onChange={handleDescriptionChange} /> <br />
                    startTime time: <input type="time" value={startTimeTimeString} onChange={handleStartTimeTimeChange} />
                    <br />
                    endTime time: <input type="time" value={endTimeTimeString} onChange={handleEndTimeTimeChange} />

                    <br />
                     maxPeople: <input type="number" value={maxPeople} onChange={handleMaxPeople} /><br />
                    <select value={roleSelection} onChange={handleRoleSelectionChange} multiple={true}>
                        {
                            chooseRoles.map((role) => {
                                role = findRoleById(roles, role)
                                return <option key={role.id} value={role.id}>{role.abreviation}: {role.description}</option>
                            })
                        }
                    </select>
                    <select value={categorieSelection} onChange={handleCategorieSelectionChange}>
                        {
                            timeslotCategories.map((timeslotCategorie) => {
                                return <option key={timeslotCategorie.id} value={timeslotCategorie.id}>{timeslotCategorie.title} minimum cancel times (hours): {timeslotCategorie.cancelLength}</option>
                            })
                        }
                    </select>
                    <input type="submit" />
                </form >
            </div>
        )
    } else {
        return <div>loading roles</div>
    }
}

export default MultipleTimeslotForm