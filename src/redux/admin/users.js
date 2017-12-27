import {handleActions} from 'redux-actions';
import axios from 'axios';

const ACTION_GET = 'adminUsers.get',
    ACTION_GET_SUCCESS = 'adminUsers.get.success',
    ACTION_GET_FAILED = 'adminUsers.get.failed';

//ACTIONS
export function getAction() {
    return (dispatch) => {
        dispatch({type: ACTION_GET});

        axios.get('/api/admin/users', {
            headers: {
                token: window.localStorage.getItem('token')
            }
        }).then(res => {
            dispatch({
                type: ACTION_GET_SUCCESS,
                data: res.data
            });
        }).catch(e => {
            dispatch({
                type: ACTION_GET_FAILED,
                error: e.response.data.error
            });
        });
    }
}

//REDUCER
const initialState = {
    error: null,
    data: {}
};

const reducer = handleActions({
    [ACTION_GET_SUCCESS]: (state, action) => {
        return {
            ...state,
            data: action.data
        };
    },
    [ACTION_GET_FAILED]: (state, action) => {
        return {
            ...state,
            error: action.error
        };
    }
}, initialState);

export default reducer;

//SELECTORS
export const getError = (state) => state.adminUsers.error;
export const getData = (state) => state.adminUsers.data;
