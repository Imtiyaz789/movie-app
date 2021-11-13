import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// here is redux logger function 
// working like this = logger(obj)(next)(action)
// const logger = function({dispatch, getState}){
//   return function(next){
//     return function(action){
//       // here will be our middleware code
//       console.log('ACTION_TYPE', action.type);
//       next(action);
//     }
//   }
// }

// below is second way to write logger
const logger = ({ dispatch, getState }) => (next) => (action) => {
  if(typeof action !== 'function'){
    console.log('ACTION_TYPE =', action.type);
  }
    next(action);
  };

  // instead of below code we can use thunk package from redux-thunk that will work same as code below written
// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// };


const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('Store', store);
// console.log('before state', store.getState());

// below code use where our data to be shown
// store.dispatch({
//   type : 'ADD_MOVIES',
//   movies :[{name : 'superman'}]
// })
// console.log('after state', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store = {store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

