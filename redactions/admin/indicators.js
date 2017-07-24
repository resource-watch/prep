import 'isomorphic-fetch';
import IndicatorsService from 'services/IndicatorsService';

/**
 * CONSTANTS
*/
const GET_INDICATORS_SUCCESS = 'indicators/GET_INDICATORS_SUCCESS';
const GET_INDICATORS_ERROR = 'indicators/GET_INDICATORS_ERROR';
const GET_INDICATORS_LOADING = 'indicators/GET_INDICATORS_LOADING';
const SET_INDICATORS_FILTERS = 'indicators/SET_INDICATORS_FILTERS';

/**
 * STORE
 * @property {string} indicators.error
 * @property {{ key: string, value: string|number }[]} indicators.filters
 */
const initialState = {
  indicators: {
    list: [],       // Actual list of indicators
    loading: false, // Are we loading the data?
    error: null,    // An error was produced while loading the data
    filters: []     // Filters for the list of indicators
  }
};

const service = new IndicatorsService();
/**
 * REDUCER
 * @export
 * @param {initialState} state
 * @param {{ type: string, payload: any }} action
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INDICATORS_LOADING: {
      const indicators = Object.assign({}, state.indicators, {
        loading: true,
        error: null
      });
      return Object.assign({}, state, { indicators });
    }

    case GET_INDICATORS_SUCCESS: {
      const indicators = Object.assign({}, state.indicators, {
        list: action.payload,
        loading: false,
        error: null
      });
      return Object.assign({}, state, { indicators });
    }

    case GET_INDICATORS_ERROR: {
      const indicators = Object.assign({}, state.indicators, {
        loading: false,
        error: action.payload
      });
      return Object.assign({}, state, { indicators });
    }

    case SET_INDICATORS_FILTERS: {
      const indicators = Object.assign({}, state.indicators, { filters: action.payload });
      return Object.assign({}, state, { indicators });
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 */

/**
 * Retrieve the list of indicators
 * @export
 * @param {string[]} applications Name of the applications to load the indicators from
 */
export function getIndicators() {
  return (dispatch) => {
    dispatch({ type: GET_INDICATORS_LOADING });

    service.fetchAllData()
      .then((data) => {
        dispatch({ type: GET_INDICATORS_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: GET_INDICATORS_ERROR, payload: err.message });
      });
  };
}

/**
 * Set the filters for the list of indicators
 * @export
 * @param {{ key: string, value: string|number }[]} filters List of filters
 */
export function setFilters(filters) {
  return dispatch => dispatch({
    type: SET_INDICATORS_FILTERS,
    payload: filters
  });
}
