import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTimeslot } from "../actions/timeslot"

import { toDateString, toTimeString } from "../utils/timeFormat"
import {errorCodeFormatting} from "../utils/errorCodeFormatting"

import { getRoleList } from '../actions/role';

import {Alert} from "@material-ui/lab"

function TimeslotForm() {



    const [description, setDescription] = useState("")
    const [startTime, setStarttime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [maxPeople, setMaxPeople] = useState(1)
    const [roleSelection, setRoleSelection] = useState([])

    const token = useSelector(state => state.login.token)
    const roles = useSelector(state => state.roles)
    const errorCode = useSelector(state => state.timeslot.errorCode)
    const successTimeslot = useSelector(state => state.timeslot.succes)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("reload roles")

        dispatch(getRoleList())
    }, [dispatch])

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

            console.log(tempDate)

            setStarttime(tempDate)
        }
    }

    const handleStartTimeTimeChange = (event) => {
        let timeSplitted = event.target.value.split(":")
        let tempDate = new Date(startTime.getTime())

        if (event.target.value !== "") {
            console.log(timeSplitted, event.target.value, "testing")

            tempDate.setHours(timeSplitted[0])
            tempDate.setMinutes(timeSplitted[1])

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

    const handleSubmit = (event) => {
        console.log(startTime)
        dispatch(addTimeslot(token, description, startTime, endTime, maxPeople, roleSelection))
        event.preventDefault()

    }

    const errorText = (errorCode) => {
        switch (errorCode) {
            case "NOT_AUTHORIZED":
                return "You are not not authorized to create timeslot"
            default:
                return ""
        }
    }

    const successFormatting = (success) => {
        if(success) {
            return <Alert severity="success">This is a success alert — check it out!</Alert>
        }
        return;
    }
    //do not delete
    const startTimeDateString = toDateString(startTime)
    const startTimeTimeString = toTimeString(startTime)

    const endTimeDateString = toDateString(endTime)
    const endTimeTimeString = toTimeString(endTime)
    console.log(errorCode)
    if (roles) {
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
                            roles.map((role) => {
                                return <option key={role.id} value={role.id}>{role.abreviation}: {role.description}</option>
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