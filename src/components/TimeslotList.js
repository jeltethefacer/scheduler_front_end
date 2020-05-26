import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTimeslots, subscribeTimeslot, unSubscribe , deleteTimeslot} from '../actions/timeslot';
import { getRoleList } from '../actions/role';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid, List, ListItem, ListItemText, ButtonGroup } from '@material-ui/core';

import { formatDateForCard } from "../utils/timeFormat"
import { errorCodeFormatting } from '../utils/errorCodeFormatting';
import { getUserInformation } from '../actions/user';
import { checkRole } from '../utils/checkRole';


function TimeslotList() {
    const dispatch = useDispatch()

    const timeslots = useSelector(state => state.timeslot.timeslots)
    const roles = useSelector(state => state.roles)
    const userRoles = useSelector(state => state.user.roles)


    const errorCodeTimeslot = useSelector(state => state.timeslot.errorCode)
    const token = useSelector(state => state.login.token)



    const useStyles = makeStyles((theme) => ({
        root: {
            width: 400,
            height: 200,
        }
    }));

    const classes = useStyles();




    useEffect(() => {
        if (token) {
            dispatch(getTimeslots(token))
            dispatch(getRoleList(token))
            dispatch(getUserInformation(token))
        }
    }, [dispatch, token])

    const mapTimeslots = (timeslots, roles) => {
        return <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
            {timeslots.map(timeslot => {
                const startTimeDate = new Date(timeslot.startTime)
                const endTimeDate = new Date(timeslot.endTime)
  
                const returnElement = 
                <Card key={timeslot.id}>
                    <CardHeader title={formatDateForCard(startTimeDate, endTimeDate)} subheader={timeslot.description} className={classes.root} />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" className={classes.title}>
                                    Roles
                                </Typography>
                                <List dense={true}>
                                    {timeslot.roles.map((roleId) => {
                                        const role = findRoleById(roles, roleId)

                                        return <ListItem key={roleId}>
                                            <ListItemText
                                                primary={role.abreviation}
                                            />
                                        </ListItem>
                                    })}
                                </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" className={classes.title}>
                                    Users
                                </Typography>
                                <List dense={true}>
                                    {timeslot.subscribed.map((userId) => {

                                        return <ListItem key={userId}>
                                            <ListItemText
                                                primary={userId}
                                            />
                                        </ListItem>
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`${timeslot.subscribed.length}/${timeslot.maxPeople}`}<br />
                        </Typography>

                    </CardContent>

                    <CardActions>
                        <ButtonGroup>
                            <Button onDoubleClick={() =>  dispatch(subscribeTimeslot(token, timeslot.id)) } color="primary">
                                Meld mij aan
                            </Button>
                            <Button onDoubleClick={() =>  dispatch(unSubscribe(token, timeslot.id))       } color="secondary">
                                unSubscribe
                            </Button>
                            {checkRole(userRoles, "createTimeslots") ? <Button onDoubleClick={() =>  dispatch(deleteTimeslot(token, timeslot.id))       } color="secondary">
                                delete
                            </Button> : ""}
                        </ButtonGroup>
                    </CardActions>
                </Card>

                return returnElement
            })}
        </Grid>
    }

    const errorText = (errorCode) => {
        switch (errorCode) {
            case "TIMESLOT_FULL":
                return "time slot full please fuck off"
            case "NO_VALID_ROLE":
                return "you do not have the required role to subscribe to this timeslot please contact the moderator if you think this is an error."
            default:
                return <div></div>
        }
    }

    const findRoleById = (rolesArray, roleId) => {
        return rolesArray.filter(role => role.id === roleId)[0]
    }

    if (timeslots && roles.length !== 0) {
        return (
            <div>
                {errorCodeFormatting(errorCodeTimeslot, errorText)}
                {mapTimeslots(timeslots, roles)}
            </div>
        )
    }

    return <div></div>
}

export default TimeslotList