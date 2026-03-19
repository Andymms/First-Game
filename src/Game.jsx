import React from 'react';
import './index.css';
import { GamePaused } from './Menus/GamePaused';
import { useState, useEffect } from 'react';

export const Game = () => {

    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 10;

        const tryStartGame = () => {
            if (typeof window.startGame === 'function') {
                console.log("Game engine found! Starting...");
                window.startGame();
            } else if (attempts < maxAttempts) {
                attempts++;
                console.log(`Waiting for game.js... (Attempt ${attempts})`);
                setTimeout(tryStartGame, 100); // Try again in 100ms
            } else {
                console.error("Could not find window.startGame after 10 attempts.");
            }
        };

        tryStartGame();
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