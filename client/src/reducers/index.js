import { LOG_IN, LOG_OUT, REGISTER_SUCCESS, REGISTER_FAIL, LOG_IN_ADMIN } from '../constants'
import { combineReducers } from 'redux'

const initialState = {
  registered: false,
  loggedIn: false,
  loggedInADMIN: false
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, registered: true }
    case REGISTER_FAIL:
      return { ...state, registered: false }
    default:
      return state
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedIn: true }
    case LOG_OUT:
      return { ...state, loggedIn: false, loggedInADMIN: false }
    case LOG_IN_ADMIN:
      return { ...state, loggedInADMIN: true }
    default:
      return state
  }
}

export const reducers = combineReducers({
  registerReducer,
  loginReducer
})