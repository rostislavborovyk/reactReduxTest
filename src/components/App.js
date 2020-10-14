import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";

import '../static/App.css';
import {tracksSlice} from "../reduxToolkit/reducers/tracksSlice";
import {filterTrackSlice} from "../reduxToolkit/reducers/filterTrackSlice";
import {getTracks} from "../reduxToolkit/thunks/getTracks";
import {Link} from 'react-router-dom'

function App(props) {
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
              <div className="navbar__input">
                <input type="text" id="addTrack"/>
                <button onClick={onAddTrack}>Add track</button>
              </div>
              <div className="navbar__input">
                <label>Find track: </label>
                <input type="text" id="filterTrack" onChange={onFilterTrack} placeholder="track name..."/>
              </div>
            </div>
          </div>
        </div>
        <div className="tracks">
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