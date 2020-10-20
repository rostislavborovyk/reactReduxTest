import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";

import '../static/App.css';
import {tracksSlice} from "../reduxToolkit/reducers/tracksSlice";
import {filterTrackSlice} from "../reduxToolkit/reducers/filterTrackSlice";
import {getTracks} from "../reduxToolkit/thunks/getTracks";
import {Link} from 'react-router-dom'
import LoginButton from "./loginButton";
import LogoutButton from "./logoutButton";
import {useAuth0} from "@auth0/auth0-react";
import AuthData from "./AuthData";

function App(props) {
  const {isAuthenticated} = useAuth0();

  useEffect(() => {
    props.getTracks();
  }, [])

  const onAddTrack = () => {
    const elem = document.getElementById("addTrack")
    const name = elem.value;
    props.addTrack(name)
    elem.value = "";
  }

  const onFilterTrack = (elem) => {
    props.filterTrack(elem.target.value)
  }

  const onDeleteTrack = (elem) => {
    props.deleteTrack(elem.target.id)
  }

  return (
    <Fragment>
      <div className="wrapper">
        <div className="navbar">
          <div className="container">
            <div className="navbar__row">
              <div className="navbar__tools">
                <div className="navbar__element">
                  <input type="text" id="addTrack"/>
                  <button onClick={onAddTrack} id="addTrack">Add track</button>
                </div>
                <div className="navbar__element">
                  <label>Find track: </label>
                  <input type="text" id="filterTrack" onChange={onFilterTrack} placeholder="track name..."/>
                </div>
              </div>
              <div className="navbar__auth">
                {
                  !isAuthenticated
                    ?
                    <div className="navbar__element">
                      <LoginButton/>
                    </div>
                    :
                    <div className="navbar__element">
                      <LogoutButton/>
                    </div>
                }


              </div>
            </div>
          </div>
        </div>
        <div className="tracks">
          <div className="empty">
          </div>
          <div className="container">
            <ul className="tracks__list">
              {
                props.tracks.length
                  ?
                  props.tracks.map(track => (
                    <div key={track.id} className="tracks__track">
                      <Link key={track.id} to={`/track/${track.id}`}>
                        <li key={track.id}>
                          {track.name}
                        </li>
                      </Link>
                      <div className="tracks__delete">
                        <button id={track.id} onClick={onDeleteTrack}>
                          delete
                        </button>
                      </div>
                    </div>
                  ))
                  :
                  <li>Not any tracks yet</li>
              }
            </ul>
          </div>
          <div className="auth">
            {
              isAuthenticated
                ?
                <AuthData/>
                :
                <h1>Login to see more</h1>
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default connect(
  state => ({
    tracks: state.tracks.filter((elem) => {
      return elem.name.includes(state.filterTrack)
    }),
  }),
  dispatch => ({
    addTrack: name => {
      const id = Date.now().toString();
      const payload = {id, name};
      dispatch(tracksSlice.actions.addTrack(payload))
    },
    deleteTrack: id => {
      dispatch(tracksSlice.actions.deleteTrack(id))
    },
    filterTrack: name => {
      dispatch(filterTrackSlice.actions.filterTrack(name))
    },
    getTracks: () => {
      dispatch(getTracks())
    }
  })
)(App);