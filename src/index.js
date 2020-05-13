import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import reducer from './reduxStore/reducer';

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>, document.getElementById('root'));
serviceWorker.unregister();
