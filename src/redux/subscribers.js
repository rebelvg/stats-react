import {handleActions} from 'redux-actions';
import axios from 'axios';
import _ from 'lodash';

const ACTION_GET = 'get',
    ACTION_GET_SUCCESS = 'get.success',
    ACTION_GET_FAILED = 'get.failed';

//ACTIONS
export function getSubscribersAction(limit = 20, currentPage = 0, filters = [], sorts = []) {
    return (dispatch) => {
        dispatch({type: ACTION_GET});

        let params = {};

        _.forEach(filters, (filter) => {
            params[filter.id] = filter.value;
        });

        params.sort = [];

        _.forEach(sorts, (sort) => {
            if (sort.desc) {
                params.sort.push(`-${sort.id}`);
            } else {
                params.sort.push(sort.id);
            }
        });

        params.page = currentPage + 1;
        params.limit = limit;

        axios.get('/api/subscribers', {
            params: params
        }).then(res => {
            dispatch({type: ACTION_GET_SUCCESS, data: res.data});
        }).catch(e => {
            dispatch({type: ACTION_GET_FAILED, error: e});
        });
    }
}

//REDUCER
const initialState = {
    error: null,
    data: {},
    isLoading: false
};

const reducer = handleActions({
    [ACTION_GET]: (state, action) => {
        return {
            ...state,
            isLoading: true
        };
    },
    [ACTION_GET_SUCCESS]: (state, action) => {
        return {
            ...state,
            data: action.data,
            isLoading: false
        };
    },
    [ACTION_GET_FAILED]: (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoading: false
        };
    }
}, initialState);

export default reducer;

//SELECTORS
export const getError = (state) => state.subscribers.error;
export const getData = (state) => state.subscribers.data;
export const getLoading = (state) => state.subscribers.isLoading;
