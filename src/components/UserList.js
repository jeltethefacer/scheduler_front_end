import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser, toggleRole } from "../actions/moderator"
import { getRoleList } from "../actions/role"
import "../css/dropdown.css"

import AddUser from "./AddUser"
import AddRole from "./AddRole"

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


    

    const findRoleById = (rolesArray, roleId) => {
        return rolesArray.filter(role => role.id === roleId)[0]
    }

    function mapUsers() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>front name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>ID</th>
                        <th>roles</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => <tr key={user.id}>
                            <td>{user.frontName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.id}</td>
                            <td>{user.roles.map(role => <div key={role}>{findRoleById(roles, role).abreviation}</div>)}</td>
                            <td><button onClick={() => dispatch(deleteUser(token, user.id))}>Delete User</button></td>
                            <td>
                                <div className="dropdown">
                                    <button className="dropbtn">Dropdown</button>
                                    <div className="dropdown-content">
                                        {roles.map(role => <button key={role.id} onClick={() => dispatch(toggleRole(token, role.id, user.id))}>{role.abreviation}</button>)}
                                    </div>
                                </div>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        )
    }

    if (users && roles) {
        return (
            <div>

                {mapUsers()}
                <AddUser />
                <AddRole />
            </div>
        )
    }

    return <div></div>
}

export default UserList