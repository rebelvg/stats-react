import {combineReducers} from 'redux';
import streams from './streams';
import stream from './stream';
import subscribers from './subscribers';
import subscriber from './subscriber';
import channels from './channels';

const reducers = combineReducers({
    streams,
    stream,
    subscribers,
    subscriber,
    channels
});

export default reducers;
