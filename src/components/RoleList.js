import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRoleList } from "../actions/role"
import "../css/dropdown.css"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router';

function RoleList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const token = useSelector(state => state.login.token)
    const roles = useSelector(state => state.roles)

    useEffect(() => {
        if (token) {
            dispatch(getRoleList())
        }
    }, [dispatch, token])

    const redirectEditRole = (roleId) => {
        history.push(`/role/edit/${roleId}`)
    }


    function mapRoles(roles) {
        return (
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>abreviation</TableCell>
                        <TableCell>description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        roles.map(role => 
                            <TableRow key={role.id} onDoubleClick={() => redirectEditRole(role.id)}>
                                <TableCell>{role.id}</TableCell>
                                <TableCell>{role.abreviation}</TableCell>
                                <TableCell>{role.description}</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
                </Table>
            </TableContainer>
        )
    }
    console.log(roles)
    if (roles) {
        return (
            <div>
                {mapRoles(roles)}
            </div>
        )
    }

    return <div></div>
}

export default RoleList