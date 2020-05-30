import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTimeslot } from "../actions/timeslot"

import { toDateString, toTimeString } from "../utils/timeFormat"
import { errorCodeFormatting } from "../utils/errorCodeFormatting"

import { getRoleList } from '../actions/role';

import { Alert } from "@material-ui/lab"
import { getTimeslotCategorieList } from '../actions/timeslotCategorie';
import { getUserInformation } from '../actions/user';
import { checkRole } from '../utils/checkRole';

function TimeslotForm() {
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
    const [categorieSelection, setCategorieSelection] = useState("")




    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoleList())
        dispatch(getTimeslotCategorieList(token))
        dispatch(getUserInformation(token))
    }, [dispatch, token])

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleStartTimeDateChange = (event) => {
        const dateSplitted = event.target.value.split("-")
        let tempDate = new Date(startTime.getTime())

        if (event.target.value !== "") {
            tempDate.setFullYear(dateSplitted[0])
            tempDate.setMonth(dateSplitted[1] - 1)
            tempDate.setDate(dateSplitted[2])

            // if the new date start time is later than the end time change the end time to the start time
            if (tempDate >= new Date(endTime.getTime())) {
                setEndTime(tempDate)
            }
            setStarttime(tempDate)
        }
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

    const handleEndTimeDateChange = (event) => {
        const dateSplitted = event.target.value.split("-")
        let tempDate = new Date(endTime.getTime())
        if (event.target.value !== "") {
            tempDate.setFullYear(dateSplitted[0])
            tempDate.setMonth(dateSplitted[1] - 1)
            tempDate.setDate(dateSplitted[2])

            setEndTime(tempDate)
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
            console.log("lmao")
            setRoleSelection(roleSelection.filter(role => role !== roleToSelect))
        } else {
            setRoleSelection(roleSelection.concat(event.target.value))
        }
    }

    const handleCategorieSelectionChange = (event) => {
        setCategorieSelection(event.target.value)
    }

    const handleSubmit = (event) => {
        console.log(startTime)
        //if the categorie is not changed set the first categorie in the list
        if (categorieSelection === "" && !categorieSelection) {
            dispatch(addTimeslot(token,
                description, startTime, endTime,
                maxPeople, roleSelection, timeslotCategories[0].id))
        } else {
            dispatch(addTimeslot(token, description, startTime, endTime, maxPeople, roleSelection, categorieSelection))
        }
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
    const startTimeDateString = toDateString(startTime)
    const startTimeTimeString = toTimeString(startTime)

    const endTimeDateString = toDateString(endTime)
    const endTimeTimeString = toTimeString(endTime)

    let chooseRoles = roles.map(role => role.id)
    if(!checkRole(userRoles, "createTimeslot")){
        if(user) {
            chooseRoles = user.chairman
        }else {
            chooseRoles = []
        }
    }



    if (roles.length !== 0 && timeslotCategories !== 0) {
        return (
            <div>
                {errorCodeFormatting(errorCode, errorText)}
                {successFormatting(successTimeslot)}
                < form onSubmit={handleSubmit} >
                    description: <input type="text" value={description} onChange={handleDescriptionChange} /> <br />
                    startTime date: <input type="date" value={startTimeDateString} onChange={handleStartTimeDateChange} />
                    startTime time: <input type="time" value={startTimeTimeString} onChange={handleStartTimeTimeChange} />
                    <br />
                    endTime date: <input type="date" value={endTimeDateString} onChange={handleEndTimeDateChange} />
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

export default TimeslotForm