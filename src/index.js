//package imports
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

//file imports
import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//here we are creating middlewares
//logger is curried form of function logger(obj,next,action)
//redux will call below function as logger(obj)(next)(action)

const logger = function ({ dispatch, getState }) { //here redux will call this function with a object and we are destructuring it over here 
  return function (next) { //that has two propert dispatch And getState which is same as we have on store object
    return function (action) {
      //middleware code
      if(typeof action !== 'function')
      console.log('ACTION_TYPE = ', action.type);
      next(action); //here this next call is important else our unidirectional loop(ui->action->reducer->store->ui...)
      //because our action will now need to be passed to next middleware if any else passed to reducer and reducer is called
    }
  }
}

//here our middleware is simply printing every action type we dispatch to store through dispatch() function
//midlewares are the things like store calls it before it calls the reducer(reducer to be called  whenever any dispatch is called)

//arrow form of logger function 
// const logger = ({ dispatch, getState }) => (next) => (action) => {
//   //logger code
//   console.log('ACTION_TYPE = ', action.type);
//   next(action);  
// }




//creating thunk - it is special type of function which is returned by another function
//we can use thunk of redux too hence we dont need to write this

//this in internal implemntation of redux-thunk
// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   if(typeof action === 'function'){
//     action(dispatch);//hence if our actionreturn a  function we are calling it with dispatch reference
//     return ;   //else 
//   }            //we are simply 
//   next(action);//returning it to reducer with this line
// }



const store = createStore(rootReducer, applyMiddleware(logger,thunk));
console.log(store);//store ahs 3 important things: 1-dispatch() function 2-getState() function and 3-subscribe() function
//dispatch() function is used to send actions to store  and it takes action object as argument
//and is called from our Ui files i.e from any component
//and then store will pass these actions(basically javascript objects) to reducers(basically pure functions) or store will call the reducers with arguments
//as we defined in reducer index.js i.e first argument as state variable present inside the store  and 2nd argument as the action object it got from dispatch function


// console.log('Before state' , store.getState()); //it will return the initial State 
// store.dispatch({          //dispatching an action to store and store will pass this action to reducer while calling reducer
//   type:'ADD_MOVIES',
//   movies:[{name:'superman'}]
// })
// console.log('After state' , store.getState());


ReactDOM.render(<App store={store} />, document.getElementById('root'));
