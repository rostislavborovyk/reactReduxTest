import {createAsyncThunk} from "@reduxjs/toolkit";

const mockData = [
  {id: 1, name: "Lalala"},
  {id: 2, name: "Panamera"},
  {id: 3, name: "The race"},
  {id: 4, name: "Vampire"},
  {id: 5, name: "Bank account"},
  {id: 6, name: "House"},
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getTracks = createAsyncThunk(
  'getTracks',
  async () => {
    await sleep(1000);
    return mockData;
  }
)
