import {createSlice} from "@reduxjs/toolkit";
import {getTracks} from "../thunks/getTracks";

const initState = [];

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState: initState,
  reducers: {
    addTrack: (state, action) => {
      return [
        ...state,
        action.payload
      ]
    },
  },
  extraReducers: {
    [getTracks.fulfilled]: (state, action) => {
      console.log("Tracks fetched successfully");
      return [...action.payload]
    }
  }
})
