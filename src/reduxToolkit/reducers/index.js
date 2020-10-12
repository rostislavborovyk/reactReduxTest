import {combineReducers} from "redux";

import {tracksSlice} from "./tracksSlice";
import {filterTrackSlice} from "./filterTrackSlice";

export const reducer =  combineReducers({
  tracks: tracksSlice.reducer,
  filterTrack: filterTrackSlice.reducer,
})
