import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './reduxStore/reducers/burderBuilder';
import orderReducer from './reduxStore/reducers/order';
import authReducer from './reduxStore/reducers/authentication';

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Combine both the reducers
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

// Create the redux store with the reducers
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// Create providers for the react redux 
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>, document.getElementById('root'));
serviceWorker.unregister();
