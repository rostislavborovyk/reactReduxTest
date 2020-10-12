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

  return (
    <Fragment>
      <div className="mainContainer">
        <div className="navbarContainer">
          <div className="navbarContainer__input">
            <input type="text" id="addTrack"/>
            <button onClick={onAddTrack}>Add track</button>
          </div>
          <div className="navbarContainer__input">
            <label>Find track: </label>
            <input type="text" id="filterTrack" onChange={onFilterTrack} placeholder="track name..."/>
          </div>
        </div>
        <div className="tracksContainer">
          {
            props.tracks.length
              ?
              props.tracks.map(track => (
                <div key={track.id} className="tracksContainer__element">
                  {/*<div key={track.id} className="tracksContainer__track">*/}
                  {/*  <Link to={`/track/${track.id}`}>{track.name}</Link>*/}
                  {/*</div>*/}
                  <Link to={`/track/${track.id}`}>
                    <div key={track.id} className="tracksContainer__track">
                      {track.name}
                    </div>
                  </Link>
                </div>
              ))
              :
              "Not any tracks yet"
          }
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
    filterTrack: name => {
      dispatch(filterTrackSlice.actions.filterTrack(name))
    },
    getTracks: () => {
      dispatch(getTracks())
    }
  })
)(App);