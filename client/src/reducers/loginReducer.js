import { LOG_IN, LOG_OUT, LOG_IN_ADMIN } from '../constants'

const initialState = {
  login: {
  loggedIn: false,
  loggedInADMIN: false
  }
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {...state, login: action.payload} 
    case LOG_OUT:
      return {...state, login: {}}
    case LOG_IN_ADMIN:
      return {...state, login: action.payload }
    default:
      return state
  }
}