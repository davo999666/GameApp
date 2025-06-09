import { useDispatch } from 'react-redux';
import {useContext, useEffect, useRef} from 'react';
import { addGuessedWord } from "../features/word/wordSlice.js";
import { GameRefContext } from "../utils/gameScreenContext.js";
import {collisionBulClo} from "../utils/function.js";

const Bullet = ({ bullets, clouds, setBullets, setClouds}) => {
    const dispatch = useDispatch();
    const gameRef = useContext(GameRefContext);
    const animationRef = useRef(null);
    const isAnimating = useRef(false);

    useEffect(() => {
            const animate = () => {
                setBullets(prevBullets => {
                    prevBullets.forEach(bullet => {
                        bullet.moveBullet()
                    });
                    const bulletsInBounds = prevBullets.filter(
                        bullet => bullet.y >= 0 && bullet.y <= gameRef.current.offsetHeight
                    );
                    return [...bulletsInBounds];
                });
                const collision = collisionBulClo(bullets, clouds);
                if (collision) {
                    console.log(collision)
                    const { bullet, cloud } = collision;
                    setBullets(p => p.filter(b => b !== bullet)); // fix: b === bullet => b !== bullet
                    dispatch(addGuessedWord(cloud.word));
                    setClouds(prevClouds => prevClouds.filter(cloud0 => cloud0 !== cloud));
                    if (!clouds[1]) {
                        dispatch(addGuessedWord(""));
                    }
                }


                animationRef.current = requestAnimationFrame(animate);
            };

            animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            isAnimating.current = false;
        };
    }, [bullets]);

    return (
        <>
            {bullets.map((bullet, index) => (
                <img
                    key={index}
                    src={bullet.image}
                    alt="Bullet"
                    className="absolute w-[2%] h-auto"
                    style={{ left: bullet.x, top: bullet.y }}
                />
            ))}
        </>
    );
};

export default Bullet;
