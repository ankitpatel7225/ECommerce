import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga.js';
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
export {store};
