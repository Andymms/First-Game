import React from 'react';
import './index.css';
import useEffect from 'react';

export const GamePaused = ({ onResume }) => {

    useEffect(() => {
        window.gameState.isPaused = true;

        return () => {
            window.gameState.isPaused = false;
        };
    }, []);

    return (
        <div className="pause-overlay">
            <div className="pause-card">
                <h1>PAUSED</h1>
                <button onClick={onResume}>RESUME GAME</button>
                <button onClick={() => window.location.reload()}>QUIT</button>
            </div>
        </div>
    );
};
