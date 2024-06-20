import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Request, Response, Info, Result } from "../../../services/types";
import CharacterSearchAPI from "../../../services/character";

const initialState: Response = {
  info: {
    count: 0,
    pages: 0,
    next: "",
    prev: ""
  },
  results: []
}

export const fetchCharacterSearch = createAsyncThunk(
  'fetchCharacterSearch',
  async (data:Request)=>{
    return await CharacterSearchAPI.fetch(data);
  }
);

const CharacterSearchSlice = createSlice({
  name:'CharacterSearchSlice',
  initialState,
  reducers:{
    updateList: (state,action) => {
      return { ...state, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacterSearch.pending,(state, action) => {

    })
    builder.addCase(
      fetchCharacterSearch.fulfilled,
      (state, action: PayloadAction<Response>) => {
          return action.payload;
      }
    );
  }
});
export default CharacterSearchSlice.reducer;
export const {updateList} = CharacterSearchSlice.actions
