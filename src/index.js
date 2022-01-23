//package imports
import React from 'react';
import ReactDOM from 'react-dom';     
import { createStore } from 'redux';

//file imports
import './index.css';      
import App from './components/App';
import movies from './reducers';



const store = createStore(movies);
console.log(store);//store ahs 3 important things: 1-dispatch() function 2-getState() function and 3-subscribe() function
//dispatch() function is used to send actions to store  and it takes action object as argument
//and is called from our Ui files i.e from any component
//and then store will pass these actions(basically javascript objects) to reducers(basically pure functions) or store will call the reducers with arguments
//as we defined in reducer index.js i.e first argument as state variable present inside the store  and 2nd argument as the action object it got from dispatch function


// console.log('Before state' , store.getState()); //it will return the initial State we have 
// store.dispatch({          //dispatching an action to store and store will pass this action to reducer while calling reducer
//   type:'ADD_MOVIES',
//   movies:[{name:'superman'}]
// })
// console.log('After state' , store.getState());


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
