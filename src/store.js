import rootReducer from './reducers/rootReducer'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))


export default store