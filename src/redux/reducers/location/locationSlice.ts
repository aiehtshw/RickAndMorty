import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Request, Response, Info, Result, LocationResponse } from "../../../services/types";
import LocationSearchAPI from "../../../services/location";


const initialState: LocationResponse = {
  info: {
    count: 0,
    pages: 0,
    next: "",
    prev: ""
  },
  results: []
}

export const fetchLocationSearch = createAsyncThunk(
  'fetchLocationSearch',
  async (data:Request)=>{
    return await LocationSearchAPI.fetch(data);
  }
);

const LocationSearchSlice = createSlice({
  name:'LocationSearchSlice',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchLocationSearch.pending,(state, action) => {

    })
    builder.addCase(
      fetchLocationSearch.fulfilled,
      (state, action: PayloadAction<LocationResponse>) => {
        return action.payload;
      }
    );
  }
});
export default LocationSearchSlice.reducer;
