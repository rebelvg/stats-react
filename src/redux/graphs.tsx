import { handleActions } from 'redux-actions';
import axios from 'axios';

import { config } from '../config';

const ACTION_GET = 'graphs.get',
  ACTION_GET_SUCCESS = 'graphs.get.success',
  ACTION_GET_FAILED = 'graphs.get.failed';

//ACTIONS
export function getAction(id) {
  return (dispatch) => {
    dispatch({ type: ACTION_GET });

    axios
      .get(`${config.STATS_HOST}/graphs/${id}`, {
        headers: {
          'jwt-token': window.localStorage.getItem('token') ?? '',
        },
      })
      .then((res) => {
        dispatch({
          type: ACTION_GET_SUCCESS,
          data: res.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: ACTION_GET_FAILED,
          error: e.response.data.error,
        });
      });
  };
}

//REDUCER
const initialState = {
  error: null,
  data: {},
  isLoading: false,
};

const reducer = handleActions(
  {
    [ACTION_GET]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [ACTION_GET_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null,
      };
    },
    [ACTION_GET_FAILED]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    },
  },
  initialState,
);

export default reducer;

//SELECTORS
export const getError = (state) => state.graphs.error;
export const getData = (state) => state.graphs.data;
export const getLoading = (state) => state.graphs.isLoading;
