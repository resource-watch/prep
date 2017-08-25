/**
 * CONSTANTS
*/
const SET_ROUTER = 'router/SET_ROUTER';

/**
 * REDUCER
*/
const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ROUTER: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - setRouter
*/
export function setRouter(routes) {
  return dispatch => dispatch({ type: SET_ROUTER, payload: routes });
}
