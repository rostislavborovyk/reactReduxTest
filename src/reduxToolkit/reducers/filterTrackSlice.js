import {createSlice} from "@reduxjs/toolkit";

const initState = "";

export const filterTrackSlice = createSlice({
  name: 'filterTrack',
  initialState: initState,
  reducers: {
    filterTrack: (state, action) => {
      return action.payload;
    }
  }
})
