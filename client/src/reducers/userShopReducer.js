import { ADD_PRODUCTS, REMOVE_PRODUCTS, SHOW_PRODUCTS, ORDER_PRODUCTS } from '../constants'

const initialState = {
  products: []
}

export const userShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return { ...state, products: state.products.concat(action.payload) }
    case REMOVE_PRODUCTS:
      return { products: state.products.filter(book => book !== action.payload) }
    case SHOW_PRODUCTS:
      return { ...state }
    case ORDER_PRODUCTS:
      return { ...state, products: action.payload }
    default:
      return state
  }
}