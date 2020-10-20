import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import * as serviceWorker from './serviceWorker';

import {configureStore} from "@reduxjs/toolkit";
import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from './components/App';
import {Provider} from "react-redux";
import {reducer} from "./reduxToolkit/reducers";
import Track from "./components/Track";
import {Auth0Provider} from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const store = configureStore({
  reducer: reducer,
})

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={App}/>
          <Route path="/track/:id" component={Track}/>
        </Router>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
