import { handleActions } from 'redux-actions';
import axios from 'axios';
import _ from 'lodash';

const ACTION_GET = 'stream.get',
  ACTION_GET_SUCCESS = 'stream.get.success',
  ACTION_GET_FAILED = 'stream.get.failed';

//ACTIONS
export function getAction(id, limit = 20, currentPage = 0, filters = [], sorts = []) {
  return dispatch => {
    dispatch({ type: ACTION_GET });

    let params = {};

    _.forEach(filters, filter => {
      params[filter.id] = filter.value;
    });

    params.sort = [];

    _.forEach(sorts, sort => {
      if (sort.desc) {
        params.sort.push(`-${sort.id}`);
      } else {
        params.sort.push(sort.id);
      }
    });

    Promise.all([
      axios.get('/api/streams/' + id, {
        headers: {
          token: window.localStorage.getItem('token')
        },
        params
      }),
      axios.get('/api/streams/' + id + '/graph', {
        headers: {
          token: window.localStorage.getItem('token')
        },
        params
      })
    ])
      .then(res => {
        dispatch({
          type: ACTION_GET_SUCCESS,
          data: res[0].data,
          events: res[1].data.events
        });
      })
      .catch(e => {
        dispatch({
          type: ACTION_GET_FAILED,
          error: e.response.data.error
        });
      });
  };
}

//REDUCER
const initialState = {
  error: null,
  data: {},
  events: []
};

const reducer = handleActions(
  {
    [ACTION_GET_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: action.data,
        events: action.events
      };
    },
    [ACTION_GET_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  },
  initialState
);

export default reducer;

//SELECTORS
export const getError = state => state.stream.error;
export const getData = state => state.stream.data;
export const getEvents = state => state.stream.events;
