import { configureStore } from '@reduxjs/toolkit';
import levelReducer from './features/level/levelSlice';
import wordReducer from './features/word/wordSlice';

export const store = configureStore({
    reducer: {
        level: levelReducer,
        word: wordReducer
    },
});
