/**
 * CONSTANTS
*/
const SET_USER = 'user/SET_USER';

/**
 * REDUCER
*/
const initialState = {
  id: null,
  role: null,
  provider: null,
  token: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - setUser
*/
export function setUser(user) {
  const userObj = Object.assign({}, user);

  // Adding Bearer to user token
  if (userObj.token &&
    typeof userObj.token === 'string' &&
    userObj.token.indexOf('Bearer') === -1) userObj.token = `Bearer ${userObj.token}`;

  return dispatch => dispatch({ type: SET_USER, payload: userObj });
}
