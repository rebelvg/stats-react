import {handleActions} from 'redux-actions';
import axios from 'axios';
import _ from 'lodash';

const GET_STREAM = 'stream.get',
    GET_STREAM_SUCCESS = 'stream.get.success',
    GET_STREAM_FAILED = 'stream.get.failed';

//ACTIONS
export function getStreamAction(id, limit = 20, currentPage = 0, filters = [], sorts = []) {
    return (dispatch) => {
        dispatch({type: GET_STREAM});

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

        Promise.all([axios.get('/api/streams/' + id, {
            params: params
        }), axios.get('/api/streams/' + id + '/graph', {
            params: params
        })]).then(res => {
                dispatch({type: GET_STREAM_SUCCESS, data: res[0].data, events: res[1].data.events});
            }
        ).catch(e => {
            dispatch({type: GET_STREAM_FAILED, error: e});
        });
    }
}

//REDUCER
const initialState = {
    error: null,
    data: {
        stream: null,
        subscribers: []
    },
    events: []
};

const reducer = handleActions({
    [GET_STREAM_SUCCESS]: (state, action) => {
        return {...state, data: action.data, events: action.events};
    },
    [GET_STREAM_FAILED]: (state, action) => {
        return {...state, error: action.error};
    }
}, initialState);

export default reducer;

//SELECTORS
export const getError = (state) => state.stream.error;
export const getData = (state) => state.stream.data;
export const getEvents = (state) => state.stream.events;
