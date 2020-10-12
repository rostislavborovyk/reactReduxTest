import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import * as serviceWorker from './serviceWorker';

import {configureStore} from "@reduxjs/toolkit";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components/App';
import {Provider} from "react-redux";
import {reducer} from "./reduxToolkit/reducers";
import Track from "./components/Track";

const store = configureStore({
  reducer: reducer,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={App}/>
        <Route path="/track/:id" component={Track}/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
