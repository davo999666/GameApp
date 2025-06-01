import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    currentSent: [],
    russianSent: null,
    guessedWord: ""
};

const wordSlice = createSlice({
    name: "word",
    initialState,
    reducers: {
        addGuessedWord: (state, action) => {
            const word = action.payload;
            if(word){
                state.guessedWord += word + " "
            }else {
                state.guessedWord = "";
            }
        },
        addWord: (state, action) => {
            state.currentSent = action.payload.split(" ");
        },
        addRussianSent: (state, action) => {
            state.russianSent = action.payload;
        }
    }
});

export const { addWord ,addRussianSent, addGuessedWord} = wordSlice.actions;
export default wordSlice.reducer;
