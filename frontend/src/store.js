import { configureStore } from '@reduxjs/toolkit';
import levelReducer from './features/level/levelSlice';
import bulletReducer from './features/bullet/bulletSlice.js'
import cloudReducer from './features/cloud/cloudSlice.js'
import wordReducer from './features/word/wordSlice';

export const store = configureStore({
    reducer: {
        level: levelReducer,
        bullet: bulletReducer,
        clouds: cloudReducer,
        word: wordReducer
    },
});
