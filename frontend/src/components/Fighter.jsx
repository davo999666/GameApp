import {useContext, useEffect, useRef, useState} from 'react';
import fighterImage from '../assets/images/fighter/fig.webp';
import {GameRefContext} from "../utils/gameScreenContext.js";
import {handleClick, handleMouseMove} from "../handlers/gameHandlers.js";

const Fighter = ({setBullets}) => {
    const [positionX, setPositionX] = useState(0);
    const imgRef = useRef(null);
    const marginPercent = -0.04;
    const gameRef = useContext(GameRefContext);

    useEffect(() => {
        const element = gameRef.current;
        if (!element) return;

        const mouseMoveHandler = (event) => {
            handleMouseMove(event, gameRef, imgRef, marginPercent, setPositionX);
            console.log(imgRef.current.clientWidth, imgRef.current.clientHeight);
        };
        const clickHandler = (event) => {
            const bulletY = gameRef.current.offsetHeight - imgRef.current.offsetHeight;
            const newBullet = handleClick(event, positionX, bulletY,gameRef.current.offsetWidth);
            setBullets(p => [...p, newBullet]);
        };

        element.addEventListener('mousemove', mouseMoveHandler);
        element.addEventListener('click', clickHandler);

        return () => {
            element.removeEventListener('mousemove', mouseMoveHandler);
            element.removeEventListener('click', clickHandler);
        };
    }, [gameRef, positionX]);

    return (
        <div
            className="absolute bottom-[1px]"
            style={{
                left: `${positionX}px`,
                transform: 'translateX(-50%)',
                pointerEvents: "none",
            }}
        >
            <img
                ref={imgRef}
                src={fighterImage}
                alt="Fighter"
                className="w-[8vw] min-w-[80px] max-w-[90px] min-h-[60px] max-h-[70px]"
            />
        </div>
    );
};

export default Fighter;
