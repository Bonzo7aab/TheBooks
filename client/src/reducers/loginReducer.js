import { LOG_IN, LOG_OUT, LOG_IN_ADMIN } from '../constants'

const initialState = {
  user: {},
  loggedIn: false,
  loggedInADMIN: false
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedIn: true, user: action.payload }
    case LOG_OUT:
      return { ...state, loggedIn: false, loggedInADMIN: false, user: {} }
    case LOG_IN_ADMIN:
      return { ...state, loggedInADMIN: true }
    default:
      return state
  }
}