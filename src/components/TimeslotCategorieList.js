import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import "../css/dropdown.css"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { getTimeslotCategorieList } from '../actions/timeslotCategorie';

function TimeslotCategorieList() {
    const dispatch = useDispatch()

    const token = useSelector(state => state.login.token)
    const timeslotCategories = useSelector(state => state.timeslotCategorie.timeslotCategories)

    useEffect(() => {
        if (token) {
            dispatch(getTimeslotCategorieList())
        }
    }, [dispatch, token])

    function mapTimeslotCategories(timeslotCategories) {
        return (
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>title</TableCell>
                        <TableCell>cancel length (hours)</TableCell>
                        <TableCell>subscribe Length (hours)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        timeslotCategories.map(timeslot => 
                            <TableRow key={timeslot.id}>
                                <TableCell>{timeslot.id}</TableCell>
                                <TableCell>{timeslot.title}</TableCell>
                                <TableCell>{timeslot.cancelLength}</TableCell>
                                <TableCell>{timeslot.subscribeLength}</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
                </Table>
            </TableContainer>
        )
    }
    if (timeslotCategories) {
        return (
            <div>
                {mapTimeslotCategories(timeslotCategories)}
            </div>
        )
    }

    return <div></div>
}

export default TimeslotCategorieList