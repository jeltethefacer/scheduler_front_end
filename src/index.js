import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import loginReducer from './reducers/login'
import roleReducer from './reducers/role';
import userReducer from "./reducers/user"
import moderatorReducer from './reducers/moderator';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import timeslotReducer from './reducers/timeslot';
import timeslotCategorieReducer from './reducers/timeslotCategorie';
import l18nReducer from './reducers/l18n';

const store = createStore(combineReducers({
  login: loginReducer,
  roles: roleReducer,
  user: userReducer,
  moderator: moderatorReducer,
  timeslot: timeslotReducer,
  timeslotCategorie: timeslotCategorieReducer,
  l18n: l18nReducer
}),
  applyMiddleware(thunk)
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);