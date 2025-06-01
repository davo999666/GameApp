import { useDispatch, useSelector } from 'react-redux';
import { setLevel } from '../features/level/levelSlice';
import { useState } from 'react';
import Game from './Game'; // Make sure you import your Game component

const levels = ['A1', 'A2', 'B1', 'B2'];

const Start = () => {
    const dispatch = useDispatch();
    const selectedLevel = useSelector((state) => state.level.selectedLevel);
    const [isGameStarted, setIsGameStarted] = useState(false); // track if game started

    const handleClick = (level) => {
        dispatch(setLevel(level));
    };

    const handleStartGame = () => {
        if (selectedLevel) {
            setIsGameStarted(true);
        } else {
            alert("Please select a level first!");
        }
    };

    if (isGameStarted) {
        return <Game />;
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div id="start-screen" className="md:w-[800px] lg:w-[900px] xl:w-[1000px] text-center space-y-4">
                <div id="buttonLevel" className="space-x-2">
                    {levels.map((level) => (
                        <button
                            key={level}
                            onClick={() => handleClick(level)}
                            className={`my-button px-6 py-2 rounded 
                                ${selectedLevel === level ? 'bg-yellow-500' : 'bg-blue-500'} 
                                text-white hover:opacity-90`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
                <div className="space-x-2">
                    <button
                        id="start-game"
                        onClick={handleStartGame}
                        className="px-8 py-4 bg-green-500 text-white rounded hover:bg-green-800"
                    >
                        Start Game
                    </button>
                    <button
                        id="end-game"
                        className="px-8 py-4 bg-red-500 text-white rounded hover:bg-red-800"
                    >
                        End Game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Start;
