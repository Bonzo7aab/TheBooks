import { ADD_PRODUCTS, REMOVE_PRODUCTS, ORDER_PRODUCTS } from '../constants'

const initialState = {
  products: {}
}

export const userShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {...state, products: action.payload}
    case REMOVE_PRODUCTS:
      return {...state, products: action.payload}
    case ORDER_PRODUCTS:
      return {...state, products: action.payload}
    default:
      return state
  }
}