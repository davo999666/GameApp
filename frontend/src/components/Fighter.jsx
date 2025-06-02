import {useContext, useEffect, useRef, useState} from 'react';
import fighterImage from '../assets/images/fighter/fig.webp';
import {addBullet} from '../features/bullet/bulletSlice.js';
import { useDispatch } from 'react-redux';
import {GameRefContext} from "../utils/gameScreenContext.js";
import { Bullet } from "../classes/bulletClass.js";
import {handleClick, handleMouseMove} from "../handlers/gameHandlers.js";

const Fighter = () => {
    const [positionX, setPositionX] = useState(0);
    const imgRef = useRef(null);
    const marginPercent = -0.04;
    const dispatch = useDispatch();
    const gameRef = useContext(GameRefContext);

    useEffect(() => {
        const element = gameRef.current;
        if (!element) return;

        const mouseMoveHandler = (event) =>{
            handleMouseMove(event, gameRef, imgRef, marginPercent, setPositionX);}
        const clickHandler = (event) =>{
            handleClick(event, positionX, gameRef, imgRef, dispatch, addBullet);}

        element.addEventListener('mousemove', mouseMoveHandler);
        element.addEventListener('click', clickHandler);

        return () => {
            element.removeEventListener('mousemove', mouseMoveHandler);
            element.removeEventListener('click', clickHandler);
        };
    }, [gameRef, imgRef, marginPercent, positionX, dispatch]);

    return (
        <div
            className="absolute bottom-[1px] border border-red-500 "
            style={{ left: `${positionX}px`, transform: 'translateX(-50%)' }}
        >
            <img
                ref={imgRef}
                src={fighterImage}
                alt="Fighter"
                className="w-[8vw] min-w-[50px] max-w-[100px] h-auto"
            />
        </div>
    );
};

export default Fighter;
