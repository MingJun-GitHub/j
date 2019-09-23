import {createStore, compose, applyMiddleware, combineReducers} from 'redux'

import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

