import React from 'react';
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid, List, ListItem, ListItemText, ButtonGroup } from '@material-ui/core';
import { subscribeTimeslot, unSubscribe, deleteTimeslot } from '../actions/timeslot';
import { formatDateForCard } from "../utils/timeFormat"
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';


import { checkRole } from '../utils/checkRole';
import { findById } from '../utils/findById';
import { useHistory } from 'react-router';


function TimeslotCards({ timeslots, userRoles, categories, userId, sortingOption, token, singleCard}) {
    const dispatch = useDispatch()
    const history = useHistory()


    const useStyles = makeStyles((theme) => ({
        root: {
            width: 400,
            height: 200,
        }
    }));
    const classes = useStyles();

    const redirectTimeslot = (timeslotId) => {
        history.push(`/timeslot/${timeslotId}`)
    }

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
                    return firstTimeslot.subscribers.length - secondTimeslot.subscribers.length
                })
            case "usersDecreasing":
                return timeslots.sort((firstTimeslot, secondTimeslot) => {
                    return secondTimeslot.subscribers.length - firstTimeslot.subscribers.length
                })
            default:
                return timeslots.sort((firstTimeslot, secondTimeslot) => {
                    return new Date(firstTimeslot.startTime) - new Date(secondTimeslot.startTime)
                })
        }
    }
    let sorted = timeslots
    if(timeslots.length > 1 && sortingOption) {
        sorted = sortTimeslot(timeslots, sortingOption)
    }         


    return <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
    >
        {sorted.map(timeslot => {
            const startTimeDate = new Date(timeslot.startTime)
            const endTimeDate = new Date(timeslot.endTime)
            const isSubscribed = findById(userId, timeslot.subscribers) ? true : false
            const category = findById(timeslot.timeslotCategory, categories)

            if(!category) {
                return <div></div>;
            }

            
            const style = {"backgroundColor": "green"}
            const returnElement =
                <Card key={timeslot.id} style={style} >
                    <CardHeader title={formatDateForCard(startTimeDate, endTimeDate)} subheader={`${category.title}: ${timeslot.description}`}
                        className={classes.root} onClick={() => redirectTimeslot(timeslot.id)} />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" className={classes.title}>
                                    Roles
                            </Typography>
                                <List dense={true}>
                                    {timeslot.Roles.map((role) => {
                                        return <ListItem key={role.id}>
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
                                    {timeslot.subscribers.map((user) => {

                                        return <ListItem key={user.id}>
                                            <ListItemText
                                                primary={`${user.frontName} ${user.lastName}`}
                                            />
                                        </ListItem>
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`${timeslot.subscribers.length}/${timeslot.maxPeople}`}<br />
                        </Typography>

                    </CardContent>

                    <CardActions>
                        <ButtonGroup>
                            {
                            
                                !isSubscribed ?
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