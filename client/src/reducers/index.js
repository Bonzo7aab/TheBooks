import { combineReducers } from 'redux'
import { registerReducer } from './registerReducer'
import { loginReducer } from './loginReducer'
import { userShopReducer } from './userShopReducer'


export const reducers = combineReducers({
  registered: registerReducer,
  login: loginReducer,
  products: userShopReducer
})