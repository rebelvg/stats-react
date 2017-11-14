import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from 'src/redux/index';

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
