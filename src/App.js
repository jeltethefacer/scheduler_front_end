import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setToken, noTokenStorage} from "./actions/login"

import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom"

//components
import LoginForm from "./components/LoginForm"
import User from "./components/Moderator.js"
import Logout from "./components/Logout"
import TimeslotForm from './components/TimeslotForm';
import TimeslotList from './components/TimeslotList';
import UserInformation from './components/UserInformation';
import Navbar from './components/Navbar';



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(setToken(token))
    } else {
      dispatch(noTokenStorage())
    }

  }, [dispatch])

  const loginInformation = useSelector(state => state.login)

  //if no login state is fetched show this
  if (loginInformation.pending) {
    return "pending...."
  }

  console.log("Production is ", process.env.NODE_ENV)

  return (
      <Router>

        <Navbar></Navbar>


        <Switch>
          <Route path="/login" render={() =>
            loginInformation.loggedIn ? <Redirect to="/user" /> : <LoginForm />
          } />

          <Route path="/timeslot/create" render={() =>
            loginInformation.loggedIn ? <TimeslotForm /> : <Redirect to="/login" />
          } />

          <Route path="/timeslot" render={() =>
            loginInformation.loggedIn ? <TimeslotList /> : <Redirect to="/login" />
          } />

          <Route path="/moderator" render={() =>
            loginInformation.loggedIn ? <User /> : <Redirect to="/login" />
          } />
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/" render={() =>
            loginInformation.loggedIn ? <UserInformation /> : <Redirect to="/login" />
          } />
        </Switch>


      </Router>
  );
}

export default App;
