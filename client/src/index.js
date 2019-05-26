import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import combinedReducers from './components/reducers'

import userFormReducer from './components/reducers'


// STORE
const store = createStore(userFormReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch({ type: 'LOGGED_IN', payload: '44543' })
console.log(store.getState())
store.dispatch({ type: 'NOT_LOGGED_IN', payload: 'not' })
console.log(store.getState())
store.dispatch({ type: 'LOGGED_IN', payload: '4asdads' })
console.log(store.getState())



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

