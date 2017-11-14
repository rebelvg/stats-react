import {handleActions} from 'redux-actions';
import axios from 'axios';
import _ from "lodash";

const GET_STREAMS = 'streams.get',
    GET_STREAMS_SUCCESS = 'streams.get.success',
    GET_STREAMS_FAILED = 'streams.get.failed';

//ACTIONS
export function getStreamsAction(limit = 20, currentPage = 0, filters = [], sorts = []) {
    return (dispatch) => {
        dispatch({type: GET_STREAMS});

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

        axios.get('/api/streams', {
            params: params
        }).then(res => {
            dispatch({
                type: GET_STREAMS_SUCCESS,
                data: res.data
            });
        }).catch(e => {
            dispatch({
                type: GET_STREAMS_FAILED,
                error: e
            });
        });
    }
}

//REDUCER
const initialState = {
    error: null,
    data: {
        streams: [],
        total: 0,
        limit: 1,
        page: 1,
        pages: 1
    },
    isLoading: false
};

const reducer = handleActions({
    [GET_STREAMS]: (state, action) => {
        return {
            ...state,
            isLoading: true
        };
    },
    [GET_STREAMS_SUCCESS]: (state, action) => {
        return {
            ...state,
            data: action.data,
            isLoading: false
        };
    },
    [GET_STREAMS_FAILED]: (state, action) => {
        return {
            ...state,
            error: action.error,
            isLoading: false
        };
    }
}, initialState);

export default reducer;

//SELECTORS
export const getError = (state) => state.streams.error;
export const getData = (state) => state.streams.data;
export const getLoading = (state) => state.streams.isLoading;
