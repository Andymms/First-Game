import React from 'react';
import './index.css';
import { GamePaused } from './Menus/GamePaused';
import { useState, useEffect } from 'react';

export const Game = () => {

    useEffect(() => {
        if (window.startGame) {
            window.startGame();
        }
    }, []);

    const [isPaused, setIsPaused] = useState(false);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsPaused(prev => !prev);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="game-wrapper">
            <canvas id="game" width={800} height={600}></canvas>

            <div className="ui-overlay">
                {isPaused && <GamePaused onResume={() => setIsPaused(false)} />}
            </div>
        </div>
    );
};