import { LOG_IN, LOG_OUT, REGISTER_SUCCESS, REGISTER_FAIL, LOG_IN_ADMIN } from '../constants'

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
    // payload: user
  }
}
export const registerFail = () => {
  return {
    type: REGISTER_FAIL
    // payload: user
  }
}

export const logInUser = (user) => {
  return {
    type: LOG_IN,
    payload: user
  }
}

export const logOutUser = () => {
  return {
    type: LOG_OUT
    // payload: user
  }
}

export const logInADMIN = () => {
  return {
    type: LOG_IN_ADMIN
    // payload: user
  }
}