import { useDispatch, useSelector } from 'react-redux';
import bulletImage from '../assets/images/bullet/bullet.png';
import {useContext, useEffect, useRef} from 'react';
import {moveBullets, removeBullet} from '../features/bullet/bulletSlice.js';
import {removeCloud} from "../features/cloud/cloudSlice.js";
import {addGuessedWord} from "../features/word/wordSlice.js";
import { GameRefContext } from "../utils/gameScreenContext.js"

const Bullet = () => {
    const dispatch = useDispatch();
    const bullets = useSelector((state) => state.bullet.bullets);
    const animationRef = useRef();
    const clouds = useSelector((state) => state.clouds.clouds);
    const gameRef = useContext(GameRefContext);
    useEffect(() => {
        const animate = () => {
            dispatch(moveBullets());
            animationRef.current = requestAnimationFrame(animate);

            bullets.forEach((bullet) => {
                if (bullet.y > gameRef.current.offsetHeight || bullet.y < gameRef.current.offsetHeight) {
                    removeBullet(bullet.id);
                };
                clouds.forEach((cloud) => {
                const isColliding =
                    bullet.x >= cloud.x &&
                    bullet.x <= cloud.x + cloud.width &&
                    bullet.y >= cloud.y &&
                    bullet.y <= cloud.y + cloud.height;
                if (isColliding && clouds[0].id === cloud.id) {
                    dispatch(addGuessedWord(cloud.word))
                    dispatch(removeCloud(cloud.id));
                    if(!clouds[1]){
                        dispatch(addGuessedWord(""))
                    }

                }
            });

            })
        };
        if (bullets.length > 0) {
            animationRef.current = requestAnimationFrame(animate);
        }


        return () => cancelAnimationFrame(animationRef.current);
    }, [bullets]);

    return (
        <>
            {bullets.map((bullet) => (
                <img
                    key={bullet.id}
                    src={bulletImage}
                    alt="Bullet"
                    className="absolute w-[2%] h-auto"
                    style={{ left: bullet.x - 10, top: bullet.y }}
                />
            ))}
        </>
    );
};

export default Bullet;

