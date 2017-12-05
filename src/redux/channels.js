import {handleActions} from 'redux-actions';
import axios from 'axios';
import _ from 'lodash';

const ACTION_GET = 'get',
    ACTION_GET_SUCCESS = 'get.success',
    ACTION_GET_FAILED = 'get.failed';

//ACTIONS
export function getAction() {
    return (dispatch) => {
        dispatch({type: ACTION_GET});

        axios.get('/api/channels').then(res => {
            dispatch({
                type: ACTION_GET_SUCCESS,
                data: res.data
            });
        }).catch(e => {
            dispatch({
                type: ACTION_GET_FAILED,
                error: e
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
        return {...state, data: action.data};
    },
    [ACTION_GET_FAILED]: (state, action) => {
        return {...state, error: action.error};
    }
}, initialState);

export default reducer;

//SELECTORS
export const getError = (state) => state.channels.error;
export const getData = (state) => state.channels.data;
