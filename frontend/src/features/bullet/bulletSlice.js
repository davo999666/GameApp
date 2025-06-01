import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bullets: [],
};

let bulletId = 0;

const bulletSlice = createSlice({
    name: 'bullet',
    initialState,
    reducers: {
        addBullet: (state, action) => {
            console.log(action.payload);
            const { x, y , speed} = action.payload;
            state.bullets.push({ id: bulletId++, x, y, speed});
        },
        moveBullets: (state) => {
            state.bullets = state.bullets
                .map((bullet) => ({ ...bullet, y: bullet.y - bullet.speed }))
                .filter((bullet) =>  bullet.y > 0);
        },
        removeBullet: (state, action) => {
            const id = action.payload;
            state.bullets = state.bullets.filter((bullet) => bullet.id !== id);
        }
    },
});

export const {addBullet, moveBullets,removeBullet} = bulletSlice.actions;

export default bulletSlice.reducer;
