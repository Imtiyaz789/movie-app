import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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
    // console.log('ACTION_TYPE =', action.type);
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

// we can use contexApi for passing our props directly to any components
// export const StoreContext = createContext();
// console.log(StoreContext);
// we can create our own Provider component and pass through the app.
// class Provider extends React.Component{
//   render(){
//     const {store} = this.props;
//     return <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>
//   }
// }
// we dont need below connect function code because react-redux already done in package. So instead use Provider from react-redux
// const connectedAppComponent = connect(callback)(App);
// export function connect (callback){
//   return function (Component) {
//     class ConnectedComponent extends React.Component{
//       constructor(props){
//         super(props);
//           this.unsubscribe =this.props.store.subscribe(() => this.forceUpdate());
//       }
//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render(){
//         return <StoreContext.Consumer>
//           {
//             (store) => {
//               const state = store.getState();
//               const dataToBePassedAsProps = callback(state);
//               return <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//             }
//           }
//         </StoreContext.Consumer>
//       }
//     };
//     // we need to create a wrapper to pass store as props in above ConnectedComponent()
//       class ConnectedComponentWrapper extends React.Component{
//         render(){
//           return (
//             <StoreContext.Consumer>
//               {(store) => <ConnectedComponent store={store}/> }
//             </StoreContext.Consumer>
//           )
//         }
//       }
//       return ConnectedComponentWrapper;
//   };
// }


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

