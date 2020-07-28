import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'redux';

/**
 * Redux Actions
 * Actions are "labels" for what type of functionality/manipulation
 * we will be performing/allowing on our global state data.
 * The action "names" ('type' property values), by convention, are
 * uppercase as they are representing a "constant" value.
 */
const addNewToDo = toDoContent => {
  return {
    type: 'ADD_NEW_TO_DO', // Our action "label."
    value: toDoContent // We can also transport necessary info that the reducer might need.
  }
}
const removeToDo = toDoId => {
  return {
    type: 'REMOVE_TO_DO', // Our action "label."
    value: toDoId // For removal, we need a unique identifier.
  }
}

/**
 * Redux Reducer
 * A reducer will actually carry out the manipulation/mutation on the
 * state data. It should expect an "action" to be passed in with any
 * necessary target data to perform its duty.
 */
const toDoReducer = ( state = [], action ) => { // Default state is an empty array here.
  switch ( action.type )
  {
    // What happens if we are adding a new to-do:
    case 'ADD_NEW_TO_DO':
      // Set up new task.
      const newTask = {
        uniqueId: uuidv4(), // Ensure a unique ID.
        value: action.value // Read passed-in "new to-do" value.
      };
      // Add this task to the state.
      state.push( newTask );
      // Return the updated state value.
      return state;
    // What happens if we are removing an existing to-do:
    case 'REMOVE_TO_DO':
      // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
      state = state.filter( toDo => toDo.uniqueId !== action.value ); // We'll have an array without the target!
      // Return the updated state value.
      return state;
  }
}

/**
 * Redux Store
 * Store is the full representation of our state. It is a complex object that
 * keeps track of the state data, and will help us operate on it using defined
 * reducers/actions.
 */
let store = createStore( toDoReducer );

// Attempt to output, see if we're getting an error.
store.subscribe( () => console.log( store.getState() ) ); // Outputs each time a change occurs (subcribe watches for changes.)

/**
 * Redux Dispatch
 * Dispatch is used for us to send commands for mutation/manipulation/reads from
 * our store/state data.
 */
store.dispatch( addNewToDo( "Buy milk." ) );
store.dispatch( addNewToDo( "Practice React." ) );
store.dispatch( addNewToDo( "Practice Redux." ) );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
