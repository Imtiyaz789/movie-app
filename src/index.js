import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import './index.css';
import App from './components/App';
import movies from './reducers';

const store = createStore(movies);
console.log('Store', store);
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

