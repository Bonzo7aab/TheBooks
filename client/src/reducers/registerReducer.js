import { REGISTER_SUCCESS, REGISTER_FAIL } from '../constants'

export const registerReducer = (state = false, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, registered: true }
    case REGISTER_FAIL:
      return { ...state, registered: false }
    default:
      return state
  }
}