import React, { useEffect, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { verifyToken, noTokenStorage } from "./actions/login"

import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom"

//components
import LoginForm from "./components/LoginForm"
import User from "./components/Moderator.js"
import Logout from "./components/Logout"
import TimeslotForm from './components/TimeslotForm';
import TimeslotList from './components/listComponents/TimeslotList';
import Navbar from './components/Navbar';
import TimeslotCategorieForm from './components/TimeslotCatogorieForm';

import translations from "./translations.json"
import FrontPage from './components/FrontPage';
import MultipleTimeslotForm from './components/forms/MultipleTimeslot';

export const languageContext = createContext()


function App() {
  const dispatch = useDispatch()

  const language = useSelector(state => state.l18n.language)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(verifyToken(token))
    } else {
      dispatch(noTokenStorage())
    }
  }, [dispatch])

  const loginInformation = useSelector(state => state.login)

  //if no login state is fetched show this
  if (loginInformation.pending) {
    return "pending...."
  }

  return (
    <Router>
      <languageContext.Provider value={translations[language]}>
        <Navbar></Navbar>


        <Switch>
          <Route path="/timeslotcategorie/edit/:timeslotCategorieId"
            component={TimeslotCategorieForm}
          />
          <Route path="/login" render={() =>
            loginInformation.loggedIn ? <Redirect to="/" /> : <LoginForm />
          } />

          <Route path="/timeslot/create/multiple" render={() =>
            loginInformation.loggedIn ? <MultipleTimeslotForm /> : <Redirect to="/login" />
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
            loginInformation.loggedIn ? <FrontPage /> : <Redirect to="/login" />
          } />
        </Switch>
      </languageContext.Provider>
    </Router>
  );
}
export default App;
