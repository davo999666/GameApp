import {useEffect, useRef, useState} from 'react';
import starBackground from '../assets/images/screen/star_background_1000x5000.png';
import Fighter from "../components/Fighter.jsx";
import Bullet from "../components/Bullet.jsx";
import Cloud from "../components/Cloud.jsx";
import Translate from "../components/Translate.jsx";
import { GameRefContext } from "../utils/gameScreenContext.js"
import {handleFullScreen} from "../handlers/fullscreenHandlers.js";
import Boom from "../components/Boom.jsx";

const Game = () => {
    const backgroundRef = useRef(null);
    const heightRef = useRef(0);
    const [bullets, setBullets] = useState([]);
    const [clouds, setClouds] = useState([]);

    useEffect(() => {

        const speed = 0.2;

        const loop = () => {
            heightRef.current += speed;
            if (heightRef.current >= 5000) heightRef.current = 0;
            if (backgroundRef.current) {
                backgroundRef.current.style.backgroundPosition = `0px ${heightRef.current}px`;
            }
            requestAnimationFrame(loop);
        };

        loop();
    }, []);

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-900 overflow-hidden select-none">
            <GameRefContext.Provider value={backgroundRef}>
                <div
                    ref={backgroundRef}
                    className="h-full w-full md:w-[600px] lg:w-[800px] xl:w-[1000px] relative select-none"
                    style={{
                        backgroundImage: `url(${starBackground})`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: 'cover',
                        userSelect: 'none',
                    }}
                >
                    <Cloud clouds={clouds} setClouds={setClouds} />
                    <Boom/>
                    <Translate/>
                    <Bullet bullets={bullets} clouds={clouds} setBullets={setBullets} setClouds={setClouds}/>
                    <Fighter setBullets={setBullets} />
                    <button
                        onClick={() => handleFullScreen(backgroundRef)}
                        className="absolute bottom-[0.5px] right-[0.5px] text-blue-500 text-xl px-2 z-10 rounded-sm"
                        title="Exit Fullscreen"
                    >
                        ⛶
                    </button>
                </div>
            </GameRefContext.Provider>
        </div>

    );
};

export default Game;
