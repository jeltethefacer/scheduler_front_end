import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUserInformation } from "../actions/user"

import UserInformation from "./UserInformation"
import UserList from "./UserList"
import TimeslotCategorieForm from './TimeslotCatogorieForm';

import AddUser from "./AddUser"

import RoleList from "./RoleList"
import AddRole from "./AddRole"
import TimeslotCategorieList from './TimeslotCategorieList';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function Moderator() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.login.token)

    useEffect(() => {
        dispatch(getUserInformation(token))
    }, [dispatch, token])



    return (
        <div>
            <UserInformation />

            <ExpansionPanel>
                <ExpansionPanelSummary
                    id="user_panel"
                    expandIcon={<ExpandMoreIcon />}
                >
                    Users
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <div>
                        <UserList />
                        <AddUser />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary
                    id="roles_panel"
                    expandIcon={<ExpandMoreIcon />}
                >
                    Roles
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <div>
                        <RoleList />
                        <AddRole />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel>
                <ExpansionPanelSummary
                    id="timeslot_categories_panel"
                    expandIcon={<ExpandMoreIcon />}
                >
                    Timeslot categories
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <div>
                        <TimeslotCategorieList />
                        <TimeslotCategorieForm />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    )
}

export default Moderator