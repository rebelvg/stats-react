import { handleActions } from 'redux-actions';
import axios from 'axios';

import { config } from '../../config';

const ACTION_GET = 'adminUsers.get',
  ACTION_GET_SUCCESS = 'adminUsers.get.success',
  ACTION_GET_FAILED = 'adminUsers.get.failed',
  ACTION_PUT = 'adminUsers.put',
  ACTION_PUT_SUCCESS = 'adminUsers.put.success',
  ACTION_PUT_FAILED = 'adminUsers.put.failed';

//ACTIONS
export function getAction() {
  return (dispatch) => {
    dispatch({ type: ACTION_GET });

    axios
      .get(`${config.STATS_HOST}/admin/users`, {
        headers: {
          'jwt-token': window.localStorage.getItem('token') ?? undefined,
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

export function putUser(id, data) {
  return (dispatch) => {
    dispatch({ type: ACTION_PUT });

    axios
      .put(`${config.STATS_HOST}/admin/users/${id}`, data, {
        headers: {
          'jwt-token': window.localStorage.getItem('token') ?? undefined,
        },
      })
      .then((res) => {
        dispatch({
          type: ACTION_PUT_SUCCESS,
          user: res.data.user,
        });
      })
      .catch((e) => {
        dispatch({
          type: ACTION_PUT_FAILED,
          error: e.response.data.error,
        });
      });
  };
}

function updateObjectInArray(users, action) {
  return users.map((item, index) => {
    if (item._id !== action.user._id) {
      return item;
    }

    return {
      ...item,
      ...action.user,
    };
  });
}

//REDUCER
const initialState = {
  error: null,
  data: {},
};

const reducer = handleActions(
  {
    [ACTION_GET_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: action.data,
        error: null,
      };
    },
    [ACTION_GET_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    },
    [ACTION_PUT_SUCCESS]: (state, action) => {
      return {
        ...state,
        data: {
          users: updateObjectInArray(state.data.users, action),
        },
        error: null,
      };
    },
    [ACTION_PUT_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    },
  },
  initialState,
);

export default reducer;

//SELECTORS
export const getError = (state) => state.adminUsers.error;
export const getData = (state) => state.adminUsers.data;
