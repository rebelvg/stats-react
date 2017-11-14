import {combineReducers} from 'redux';
import streams from './streams';
import stream from './stream';
import subscribers from './subscribers';
import subscriber from './subscriber';

const reducers = combineReducers({
    streams,
    stream,
    subscribers,
    subscriber
});

export default reducers;
