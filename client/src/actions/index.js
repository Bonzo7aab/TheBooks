import { LOG_IN, LOG_OUT, REGISTER_SUCCESS, REGISTER_FAIL, LOG_IN_ADMIN, SHOW_PRODUCTS, ADD_PRODUCTS, REMOVE_PRODUCTS } from '../constants'

// LOG IN
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
  }
}
export const logInADMIN = (user) => {
  return {
    type: LOG_IN_ADMIN,
    payload: user
  }
}

// BASKET
export const basketShow = () => {
  return {
    type: SHOW_PRODUCTS
    // payload: user
  }
}
export const basketAdd = (product) => {
  return {
    type: ADD_PRODUCTS,
    payload: product
  }
}
export const basketRemove = (product) => {
  return {
    type: REMOVE_PRODUCTS,
    payload: product
  }
}