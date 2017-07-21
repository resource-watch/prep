import 'isomorphic-fetch';
import ToolsService from 'services/ToolsService';

/**
 * CONSTANTS
*/
const GET_TOOLS_SUCCESS = 'tools/GET_TOOLS_SUCCESS';
const GET_TOOLS_ERROR = 'tools/GET_TOOLS_ERROR';
const GET_TOOLS_LOADING = 'tools/GET_TOOLS_LOADING';
const SET_TOOLS_FILTERS = 'tools/SET_TOOLS_FILTERS';

/**
 * STORE
 * @property {string} tools.error
 * @property {{ key: string, value: string|number }[]} tools.filters
 */
const initialState = {
  tools: {
    list: [],       // Actual list of tools
    loading: false, // Are we loading the data?
    error: null,    // An error was produced while loading the data
    filters: []     // Filters for the list of tools
  }
};

const service = new ToolsService();
/**
 * REDUCER
 * @export
 * @param {initialState} state
 * @param {{ type: string, payload: any }} action
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOOLS_LOADING: {
      const tools = Object.assign({}, state.tools, {
        loading: true,
        error: null
      });
      return Object.assign({}, state, { tools });
    }

    case GET_TOOLS_SUCCESS: {
      const tools = Object.assign({}, state.tools, {
        list: action.payload,
        loading: false,
        error: null
      });
      return Object.assign({}, state, { tools });
    }

    case GET_TOOLS_ERROR: {
      const tools = Object.assign({}, state.tools, {
        loading: false,
        error: action.payload
      });
      return Object.assign({}, state, { tools });
    }

    case SET_TOOLS_FILTERS: {
      const tools = Object.assign({}, state.tools, { filters: action.payload });
      return Object.assign({}, state, { tools });
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 */

/**
 * Retrieve the list of tools
 * @export
 * @param {string[]} applications Name of the applications to load the tools from
 */
export function getTools() {
  return (dispatch) => {
    dispatch({ type: GET_TOOLS_LOADING });

    service.fetchAllData()
      .then((data) => {
        dispatch({ type: GET_TOOLS_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: GET_TOOLS_ERROR, payload: err.message });
      });
  };
}

/**
 * Set the filters for the list of tools
 * @export
 * @param {{ key: string, value: string|number }[]} filters List of filters
 */
export function setFilters(filters) {
  return dispatch => dispatch({
    type: SET_TOOLS_FILTERS,
    payload: filters
  });
}
