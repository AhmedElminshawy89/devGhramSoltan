import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './Feature/TabSlice'; 

const store = configureStore({
  reducer: {
    tab: tabReducer, 
  },
});

export default store;
