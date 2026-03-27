import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import { GamePaused } from './Menus/GamePaused';
import { GameOver } from './Menus/GameOver';

export const Game = () => {

    useEffect(() => {
        const instanceId = Date.now();
        window.currentGameId = instanceId;

        const tryStartGame = () => {
            if (typeof window.startGame === 'function') {
                console.log("Starting Game Instance:", instanceId);
                window.startGame(instanceId);
            }
        };

        tryStartGame();

        return () => {
            if (window.currentGameId === instanceId) {
                window.currentGameId = null;
            }
        };
    }, []);

    const [isPaused, setIsPaused] = useState(false);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsPaused(prev => {
                    const newState = !prev;
                    if (window.gameState) window.gameState.isPaused = newState;
                    return newState;
                });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const [isGameOver, setIsGameOver] = useState(false);
    const [finalLevel, setFinalLevel] = useState(1);

    useEffect(() => {
        window.reactShowGameOver = (level) => {
            setIsGameOver(true);
            setFinalLevel(level);
        };

        window.reactHideGameOver = () => {
            setIsGameOver(false);
        };

        return () => {
            delete window.reactShowGameOver;
            delete window.reactHideGameOver;
        };

    }, []);

    return (
        <div className="game-container">
            <canvas id="game" width={800} height={600}></canvas>

            <div className="ui-overlay">
                {isPaused && <GamePaused onResume={() => setIsPaused(false)} />}
                {isGameOver && <GameOver level={finalLevel} />}
            </div>
        </div>
    );
};