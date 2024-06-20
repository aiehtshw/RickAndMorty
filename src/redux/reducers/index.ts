import { combineReducers } from '@reduxjs/toolkit';
import CharacterSearchSlice from "./character/characterSlice";
import LocationSearchSlice from "./location/locationSlice";

const rootReducer = combineReducers({
  CharacterSearch: CharacterSearchSlice,
  LocationSearch: LocationSearchSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
