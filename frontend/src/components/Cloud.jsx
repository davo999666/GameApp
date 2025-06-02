import {useContext, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createCloud} from "../utils/function.js";
import {addCloud, moveCloud, moveLeft, moveRight, removeCloud, collision, changeSize
} from "../features/cloud/cloudSlice.js";
import {getLevelWord} from "../utils/which_level.js";
import {addRussianSent, addWord} from "../features/word/wordSlice.js";
import {GameRefContext} from "../utils/gameScreenContext.js";

const Cloud = () => {
    const dispatch = useDispatch();
    const animationRef = useRef();
    const level = useSelector((state) => state.level.selectedLevel);
    const clouds = useSelector((state) => state.clouds.clouds);
    const currentSent = useSelector(state => state.word.currentSent);
    const gameRef = useContext(GameRefContext);
    useEffect(() => {
        currentSent.forEach((word) => {
            const x = Math.random() * gameRef.current.offsetWidth;
            const cloudInstance = createCloud(Math.floor(x), 0, word);
            dispatch(addCloud(cloudInstance.toObject()));
        });
    }, [currentSent])
    useEffect(() => {
        const handleResize = () => {
            clouds.forEach((cloud) => {
                const width = cloud.width * (gameRef.current?.offsetWidth || 1280) / 1280;
                const height = cloud.height * (gameRef.current?.offsetHeight || 720) / 720;
                dispatch(changeSize({ width, height }));
            });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);
    useEffect(() => {
        if (clouds.length === 0) {
            const sentencePair = getLevelWord(level);
            const russian = sentencePair.key;
            const english = sentencePair.value;
            dispatch(addWord(english));
            dispatch(addRussianSent(russian));
        }
        const animation = () => {
            dispatch(moveCloud());
            clouds.forEach((cloud) => {
                const gameWidth = gameRef.current.offsetWidth;
                const gameHeight = gameRef.current.offsetHeight;
                dispatch(collision(cloud))
                if (cloud.x + cloud.width+5 >= gameWidth) {
                    dispatch(moveLeft(cloud.id));
                } else if (cloud.x <= -5) {
                    dispatch(moveRight(cloud.id));
                }
                if (cloud.y > gameHeight + cloud.height) {
                    dispatch(removeCloud(cloud.id));
                }
            });
            animationRef.current = requestAnimationFrame(animation);
        };
        animationRef.current = requestAnimationFrame(animation);
        return () => cancelAnimationFrame(animationRef.current);
    }, [dispatch, clouds, gameRef, clouds]);



    return (
        <>
            {clouds.map((cloud) => (
                <div
                    key={cloud.id}
                    className="absolute border-2 border-red-500"

                    style={{
                        left: cloud.x,
                        top: cloud.y,
                        width: cloud.width,
                        height: cloud.height,
                        paddingBottom: cloud.width < 81 ? null : 1,
                    }}
                >
                    <img className="absolute w-full h-full block"
                        src={cloud.image}
                        alt="cloud"
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                        }}
                    />
                    <span className={"border-2 border-red-500"}
                        style={{
                            position: "absolute",
                            bottom: cloud.width < 81 ? null : 1,
                            left: "50%",
                            transform: "translateX(-50%)",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: `${cloud.width / 100 * 22}px`,
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
