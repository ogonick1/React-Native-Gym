import {createSlice} from '@reduxjs/toolkit';

const lng = {
  uk: 'uk',
  en: 'en',
};

const initialState = {lng: lng.uk};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lng = action.payload === lng.uk ? lng.uk : lng.en;
    },
  },
});

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
