import 'isomorphic-fetch';
import InsightsService from 'services/InsightsService';

/**
 * CONSTANTS
*/
const GET_INSIGHTS_SUCCESS = 'insights/GET_INSIGHTS_SUCCESS';
const GET_INSIGHTS_ERROR = 'insights/GET_INSIGHTS_ERROR';
const GET_INSIGHTS_LOADING = 'insights/GET_INSIGHTS_LOADING';
const SET_INSIGHTS_FILTERS = 'insights/SET_INSIGHTS_FILTERS';

/**
 * STORE
 * @property {string} insights.error
 * @property {{ key: string, value: string|number }[]} insights.filters
 */
const initialState = {
  insights: {
    list: [],       // Actual list of insights
    loading: false, // Are we loading the data?
    error: null,    // An error was produced while loading the data
    filters: []     // Filters for the list of insights
  }
};

const service = new InsightsService();
/**
 * REDUCER
 * @export
 * @param {initialState} state
 * @param {{ type: string, payload: any }} action
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INSIGHTS_LOADING: {
      const insights = Object.assign({}, state.insights, {
        loading: true,
        error: null
      });
      return Object.assign({}, state, { insights });
    }

    case GET_INSIGHTS_SUCCESS: {
      const insights = Object.assign({}, state.insights, {
        list: action.payload,
        loading: false,
        error: null
      });
      return Object.assign({}, state, { insights });
    }

    case GET_INSIGHTS_ERROR: {
      const insights = Object.assign({}, state.insights, {
        loading: false,
        error: action.payload
      });
      return Object.assign({}, state, { insights });
    }

    case SET_INSIGHTS_FILTERS: {
      const insights = Object.assign({}, state.insights, { filters: action.payload });
      return Object.assign({}, state, { insights });
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 */

/**
 * Retrieve the list of insights
 * @export
 * @param {string[]} applications Name of the applications to load the insights from
 */
export function getInsights() {
  return (dispatch) => {
    dispatch({ type: GET_INSIGHTS_LOADING });

    service.fetchAllData()
      .then((data) => {
        dispatch({ type: GET_INSIGHTS_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: GET_INSIGHTS_ERROR, payload: err.message });
      });
  };
}

/**
 * Set the filters for the list of insights
 * @export
 * @param {{ key: string, value: string|number }[]} filters List of filters
 */
export function setFilters(filters) {
  return dispatch => dispatch({
    type: SET_INSIGHTS_FILTERS,
    payload: filters
  });
}
