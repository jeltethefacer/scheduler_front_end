import React from 'react';
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid, List, ListItem, ListItemText, ButtonGroup } from '@material-ui/core';
import { subscribeTimeslot, unSubscribe, deleteTimeslot } from '../actions/timeslot';
import { formatDateForCard } from "../utils/timeFormat"
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';


import { checkRole, checkTimeslotCategorie } from '../utils/checkRole';


function TimeslotCards({ timeslots, userRoles, categories, userId, roleList, sortingOption, token}) {
    const dispatch = useDispatch()

    const findRoleById = (rolesArray, roleId) => {
        return rolesArray.filter(role => role.id === roleId)[0]
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: 400,
            height: 200,
        }
    }));

    const classes = useStyles();

    const sortTimeslot = (timeslots, sortOption) => {
        switch (sortOption) {
            case "startTime":
                return timeslots.sort((firstTimeslot, secondTimeslot) => {
                    return new Date(firstTimeslot.startTime) - new Date(secondTimeslot.startTime)
                })
            case "endTime":
                return timeslots.sort((firstTimeslot, secondTimeslot) => {
                    return new Date(firstTimeslot.endTime) - new Date(secondTimeslot.endTime)
                })
            case "usersRising":
                return timeslots.sort((firstTimeslot, secondTimeslot) => {
                    return firstTimeslot.subscribed.length - secondTimeslot.subscribed.length
                })
            case "usersDecreasing":
                return timeslots.sort((firstTimeslot, secondTimeslot) => {
                    return secondTimeslot.subscribed.length - firstTimeslot.subscribed.length
                })
            default:
                return timeslots.sort((firstTimeslot, secondTimeslot) => {
                    return new Date(firstTimeslot.startTime) - new Date(secondTimeslot.startTime)
                })
        }
    }

    const sorted = sortTimeslot(timeslots, sortingOption)


    return <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
    >
        {sorted.map(timeslot => {
            const startTimeDate = new Date(timeslot.startTime)
            const endTimeDate = new Date(timeslot.endTime)

            const returnElement =
                <Card key={timeslot.id}>
                    <CardHeader title={formatDateForCard(startTimeDate, endTimeDate)} subheader={checkTimeslotCategorie(categories, timeslot.timeslotCategorie).title}
                        className={classes.root} />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" className={classes.title}>
                                    Roles
                            </Typography>
                                <List dense={true}>
                                    {timeslot.roles.map((roleId) => {
                                        const role = findRoleById(roleList, roleId)

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
                            {
                            
                                !timeslot.subscribed.includes(userId) ?
                                    <Button onDoubleClick={() => dispatch(subscribeTimeslot(token, timeslot.id))} color="primary">
                                        Meld mij aan
                            </Button> :
                                    <Button onDoubleClick={() => dispatch(unSubscribe(token, timeslot.id))} color="secondary">
                                        unSubscribe
                            </Button>
                            }
                            {checkRole(userRoles, "createTimeslot") ? <Button onDoubleClick={() => dispatch(deleteTimeslot(token, timeslot.id))} color="secondary">
                                delete
                        </Button> : ""}
                        </ButtonGroup>
                    </CardActions>
                </Card>

            return returnElement
        })}
    </Grid>
}

export default TimeslotCards