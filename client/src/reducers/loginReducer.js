import { LOG_IN, LOG_OUT, LOG_IN_ADMIN } from '../constants'

const initialState = {
  user: {
    loggedIn: false,
    loggedInADMIN: false
  }
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.payload }
    case LOG_OUT:
      return { ...state, user: {} }
    case LOG_IN_ADMIN:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
