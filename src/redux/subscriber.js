import {handleActions} from 'redux-actions';
import axios from 'axios';

const GET_SUBSCRIBER = 'subscriber.get',
    GET_SUBSCRIBER_SUCCESS = 'subscriber.get.success',
    GET_SUBSCRIBER_FAILED = 'subscriber.get.failed';

//ACTIONS
export function getSubscriberAction(id) {
    return (dispatch) => {
        dispatch({type: GET_SUBSCRIBER});

        axios.get('/api/subscribers/' + id).then(res => {
            dispatch({type: GET_SUBSCRIBER_SUCCESS, data: res.data});
        }).catch(e => {
            dispatch({type: GET_SUBSCRIBER_FAILED, error: e});
        });
    }
}

//REDUCER
const initialState = {
    error: null,
    data: {
        subscriber: null,
        stream: null
    }
};

const reducer = handleActions({
    [GET_SUBSCRIBER_SUCCESS]: (state, action) => {
        return {...state, data: action.data};
    },
    [GET_SUBSCRIBER_FAILED]: (state, action) => {
        return {...state, error: action.error};
    }
}, initialState);

export default reducer;

//SELECTORS
export const getError = (state) => state.subscriber.error;
export const getData = (state) => state.subscriber.data;
