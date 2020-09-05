import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser, toggleRole, toggleChairman } from "../../actions/moderator"
import { getRoleList } from "../../actions/role"
import "../../css/dropdown.css"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';


function UserList() {
    const dispatch = useDispatch()

    const users = useSelector(state => state.moderator)
    const token = useSelector(state => state.login.token)
    const roles = useSelector(state => state.roles)

    useEffect(() => {
        if (token) {
            dispatch(getUsers(token))
            dispatch(getRoleList())
        }
    }, [dispatch, token])


    console.log(users)

    function mapUsers() {
        console.log(roles)

        return (
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>front name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>roles</TableCell>
                        <TableCell>delete user</TableCell>
                        <TableCell>change the user roles</TableCell>
                        <TableCell>is voorzitter van</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map(user => {
                            return <TableRow key={user.id}>
                                <TableCell>{user.frontName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.id}</TableCell>
                        <TableCell>{user.roles.map(role => <div key={role.id}>{role.abreviation}</div>)}</TableCell>
                                <TableCell><button onClick={() => dispatch(deleteUser(token, user.id))}>Delete User</button></TableCell>
                                <TableCell>
                                    <div className="dropdown">
                                        <button className="dropbtn">Dropdown</button>
                                        <div className="dropdown-content">
                                            {roles.map(role => <button key={role.id} onClick={() => dispatch(toggleRole(token, role.id, user.id))}>{role.abreviation}</button>)}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{user.chairman.map(role => <div key={role}>{role.abreviation}</div>)}</TableCell>
                                <TableCell>
                                    <div className="dropdown">
                                        <button className="dropbtn">Dropdown</button>
                                        <div className="dropdown-content">
                                            {roles.map(role => <button key={role.id} onClick={() => dispatch(toggleChairman(token, role.id, user.id))}>{role.abreviation}</button>)}
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
                </Table>
            </TableContainer>
        )
    }
    if (users && roles) {
        return (
            <div>
                {mapUsers()}
            </div>
        )
    }

    return <div></div>
}

export default UserList