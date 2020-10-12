import React, {Fragment} from 'react';
import {connect} from "react-redux";

function Track(props) {
  const id = props.location.pathname.replace("/track/", "");

  const track = props.tracks.find(track => track.id.toString() === id);
  return (
    <Fragment>
      <div>Track: {track.name}</div>
    </Fragment>
  );
}

export default connect(
  state => ({
    tracks: state.tracks
  })
)(Track);