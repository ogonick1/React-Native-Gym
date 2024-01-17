/* eslint-disable prettier/prettier */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import programSlice from './Slices/programSlice.js';
import exerciseSlice from './Slices/exerciseSlice.js';
import exerciseGroupSlice from './Slices/exerciseGroupSlice.js';
import  languageSlice  from './Slices/languageSlice.js';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['program'],
};

const rootReducer = combineReducers({
  program: programSlice,
  exercise: exerciseSlice,
  exerciseGroup: exerciseGroupSlice,
  language: languageSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
