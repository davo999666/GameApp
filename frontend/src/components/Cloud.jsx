import {useContext, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createChangeChecker, createCloud, rectCollision} from "../utils/function.js";
import {
    addCloud, moveCloud, moveLeft, moveRight, removeCloud
    ,collision,addSize
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
    const checkChangeRef = useRef(createChangeChecker());

    useEffect(() => {
        currentSent.forEach((word) => {
            const x = Math.random() * gameRef.current.offsetWidth;
            const cloudInstance = createCloud(Math.floor(x), 0, word);
            dispatch(addCloud(cloudInstance.toObject()));


        });
        const gameWidth = gameRef.current.offsetWidth;
        const gameHeight = gameRef.current.offsetHeight;
        dispatch(addSize({ gameWidth, gameHeight }));
    }, [currentSent]);
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
                const hasChanged = checkChangeRef.current(gameWidth + 'x' + gameHeight);
                if (hasChanged) {
                    console.log(clouds);
                    dispatch(addSize({ gameWidth, gameHeight }));
                }
                clouds.forEach((cloud2) => {
                    if (cloud !== cloud2 && rectCollision(cloud, cloud2)) {
                        dispatch(collision(cloud))
                    }
                });
                if (cloud.x + (cloud.width) >= gameWidth) {
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
                    className="absolute pointerEvents: none"

                    style={{
                        left: cloud.x,
                        top: cloud.y,
                        width: cloud.width,
                        height: cloud.height,
                        pointerEvents: "none"
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
                    <span
                        style={{
                            position: "absolute",
                            bottom: '1px',
                            left: "50%",
                            transform: "translateX(-50%)",
                            color: "black",
                            fontWeight: "bold",
                            // fontSize: `${(cloud.width / 100) * 1.3}em`,
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
