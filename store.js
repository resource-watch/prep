import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as reducers from 'redactions';

// REDUCERS
const reducer = combineReducers({ ...reducers });

export const initStore = (initialState = {}) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(
      /* The router middleware MUST be before thunk otherwise the URL changes
      * inside a thunk function won't work properly */
      applyMiddleware(thunk)
    )
  );
