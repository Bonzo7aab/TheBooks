import { combineReducers } from 'redux'

const initialState = {
  registered: false,
  loggedIn: false,
  loggedInADMIN: false
}

const userFormReducer = (state = initialState, action) => {
  //console.log('reducer', state, action)
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return { registered: true }
    case 'REGISTER_FAIL':
      return { registered: false }
    case 'LOGGED_IN':
      return { ...state, loggedIn: true, payload: action.payload }
    case 'NOT_LOGGED_IN':
      return { ...state, loggedIn: false, payload: action.payload }
    case 'LOGGED_OUT':
      return {
        loggedIn: false,
        loggedInADMIN: false
      }
    case 'LOGGED_IN_ADMIN':
      return { loggedInADMIN: true }
    default:
      return state
  }
}



// Naprawic combinedReducers

export default userFormReducer

// export default combineReducers({
//   loggedIn: userFormReducer
// })