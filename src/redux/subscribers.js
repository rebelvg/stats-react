import {handleActions} from 'redux-actions';
import axios from 'axios';
import _ from 'lodash';

const GET_SUBSCRIBERS = 'subscribers.get',
    GET_SUBSCRIBERS_SUCCESS = 'subscribers.get.success',
    GET_SUBSCRIBERS_FAILED = 'subscribers.get.failed';

//ACTIONS
export function getSubscribersAction(limit = 20, currentPage = 0, filters = [], sorts = []) {
    return (dispatch) => {
        dispatch({type: GET_SUBSCRIBERS});

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
            dispatch({type: GET_SUBSCRIBERS_SUCCESS, data: res.data});
        }).catch(e => {
            dispatch({type: GET_SUBSCRIBERS_FAILED, error: e});
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
    [GET_SUBSCRIBERS]: (state, action) => {
        return {
            ...state,
            isLoading: true
        };
    },
    [GET_SUBSCRIBERS_SUCCESS]: (state, action) => {
        return {
            ...state,
            data: action.data,
            isLoading: false
        };
    },
    [GET_SUBSCRIBERS_FAILED]: (state, action) => {
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
