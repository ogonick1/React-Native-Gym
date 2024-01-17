import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uk: [
    {id: 1, group: 'руки'},
    {id: 2, group: 'груди'},
    {id: 3, group: 'ноги'},
    {id: 4, group: 'спина'},
    {id: 5, group: 'плечі'},
    {id: 6, group: 'живіт'},
  ],
  en: [
    {id: 1, group: 'arms'},
    {id: 2, group: 'chest'},
    {id: 3, group: 'legs'},
    {id: 4, group: 'back'},
    {id: 5, group: 'shoulders'},
    {id: 6, group: 'press'},
  ],
};

export const exerciseGroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
});

export const {} = exerciseGroupSlice.actions;

export default exerciseGroupSlice.reducer;
