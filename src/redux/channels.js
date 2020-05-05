import { handleActions } from 'redux-actions';
import axios from 'axios';

const ACTION_GET = 'channels.get',
  ACTION_GET_SUCCESS = 'channels.get.success',
  ACTION_GET_FAILED = 'channels.get.failed';

//ACTIONS
export function getAction() {
  return dispatch => {
    dispatch({ type: ACTION_GET });

    axios
      .get('/api/channels', {
        headers: {
          token: window.localStorage.getItem('token')
        }
      })
      .then(res => {
        dispatch({
          type: ACTION_GET_SUCCESS,
          data: res.data
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
  data: {}
};

const reducer = handleActions(
  {
    [ACTION_GET_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: action.data,
        error: null
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
export const getError = state => state.channels.error;
export const getData = state => state.channels.data;
