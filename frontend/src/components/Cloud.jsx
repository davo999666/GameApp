import {useContext, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import { createCloud, rectCollision} from "../utils/function.js";
import {getLevelWord} from "../utils/which_level.js";
import {addRussianSent, addWord} from "../features/word/wordSlice.js";
import {GameRefContext} from "../utils/gameScreenContext.js";

const Cloud = ({ clouds, setClouds }) => {
    const dispatch = useDispatch();
    const animationRef = useRef();
    const level = useSelector((state) => state.level.selectedLevel);
    const currentSent = useSelector((state) => state.word.currentSent);
    const gameRef = useContext(GameRefContext);

    useEffect(() => {
        setClouds(prev => {
            prev.forEach(cloud => {
                cloud.changeSize(gameRef.current.offsetWidth, gameRef.current.offsetHeight);
            });
            return [...prev];
        });
    }, [gameRef.current?.offsetWidth, gameRef.current?.offsetHeight]);

    useEffect(() => {
        if (clouds.length === 0) {
            const sentencePair = getLevelWord(level);
            dispatch(addWord(sentencePair.value));
            dispatch(addRussianSent(sentencePair.key));
        }
    }, [clouds.length]);

    useEffect(() => {
        currentSent.forEach((word) => {
            const x = Math.random() * gameRef.current.offsetWidth;
            const cloudInstance = createCloud(Math.floor(x), 0, word);
            setClouds((prev) => [...prev, cloudInstance]);
        });
    }, [currentSent]);

    useEffect(() => {
        const animate = () => {
            setClouds((prevClouds) => {
                const gameWidth = gameRef.current.offsetWidth;
                const gameHeight = gameRef.current.offsetHeight;
                return prevClouds
                    .map((cloud) => {
                        cloud.moveCloud(gameWidth);
                        prevClouds.forEach((anotherCloud) => {
                            if (cloud !== anotherCloud && rectCollision(cloud, anotherCloud)) {
                                cloud.collision(anotherCloud);
                            }
                        });
                        return cloud;
                    })
                    .filter((cloud) => cloud.y <= gameHeight + cloud.height);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [setClouds]);

    return (
        <>
            {clouds.map((cloud, index) => (
                <div
                    key={index}
                    className="absolute"
                    style={{
                        left: cloud.x,
                        top: cloud.y,
                        width: cloud.width,
                        height: cloud.height,
                        pointerEvents: "none",
                    }}
                >
                    <img
                        src={cloud.image}
                        alt="cloud"
                        className="absolute w-full h-full block"
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                        }}
                    />
                    <span
                        style={{
                            position: "absolute",
                            bottom: "1px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: `${(gameRef.current.offsetWidth / 100) * 2}px`,
                            pointerEvents: "none",
                        }}
                    >
            {cloud.word}
          </span>
                </div>
            ))}
        </>
    );
};

export default Cloud;
