import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    clouds: [],
};

let cloudId = 0;

const cloudSlice = createSlice({
    name: 'clouds',
    initialState,
    reducers: {
        addCloud: (state, action) => {
            const cloud = action.payload;
            state.clouds.push({ id: cloudId++,...cloud });
        },
        moveCloud: (state) => {
            state.clouds = state.clouds.map((cloud) => ({ ...cloud, y : cloud.y + cloud.speed }));
        },
        moveLeft: (state, action) => {
            const id = action.payload;
            state.clouds = state.clouds.map((cloud) =>
                cloud.id === id ? { ...cloud, x: cloud.x - 1 , y: cloud.y - cloud.speed} : cloud
            );
        },
        moveRight: (state, action) => {
            const id = action.payload;
            state.clouds = state.clouds.map((cloud) =>
                cloud.id === id ? { ...cloud, x: cloud.x + 1 , y: cloud.y - cloud.speed} : cloud
            );
        },
        removeCloud: (state, action) => {
            const idToRemove = action.payload;
            state.clouds = state.clouds.filter(cloud => cloud.id !== idToRemove);
        },

        collision: (state, action) => {
            const target = action.payload;

            state.clouds.forEach(cloud => {
                if(cloud.id === target.id) {return}
                const overlapX = cloud.x < target.x + target.width && cloud.x + cloud.width > target.x;
                const overlapY = cloud.y < target.y + target.height && cloud.y + cloud.height > target.y;

                const isColliding = overlapX && overlapY;

                if (isColliding) {
                    const cloudCenterX = cloud.centerX;
                    const cloudCenterY = cloud.centerY;
                    const targetCenterX = target.centerX;
                    const targetCenterY = target.centerY;

                    // Determine direction to move away from the target
                    if (cloudCenterX < targetCenterX) {
                        cloud.x -= 3;
                    } else {
                        cloud.x += 3;
                    }
                    if (cloudCenterY < targetCenterY) {
                        cloud.y += 1;
                    } else {
                        cloud.y -= 1;
                    }
                }
            });
        }
    }
})

export const {addCloud, moveCloud,moveLeft,moveRight,removeCloud, collision} = cloudSlice.actions;
export default cloudSlice.reducer;