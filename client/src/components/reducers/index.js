import { combineReducers } from 'redux'


const sessionReducer = () => {
  return [
    { user: 'Michal', loggedIn: true },
    { user: 'Jeff', loggedIn: false },
    { user: 'Hank', loggedIn: false }
  ]
}

const loggedInReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return { loggedIn: true }
    case 'NOT_LOGGED_IN':
      return { loggedIn: false }
    case 'LOGGED_OUT':
      return { loggedIn: false }
    default:
      return state
  }
}

export default combineReducers({
  user: sessionReducer,
  loggedIn: loggedInReducer
})