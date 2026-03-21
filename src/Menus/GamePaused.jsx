import React from 'react';
import { useState, useEffect } from 'react';
import './Menus.css';

export const GamePaused = ({ onResume }) => {

    useEffect(() => {
        window.gameState.isPaused = true;

        return () => {
            window.gameState.isPaused = false;
        };
    }, []);

    return (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center paused-overlay">

            <div className="p-4 text-center paused-container">
                <h1 className="shadow-lg mb-4 text-light">
                    PAUSED
                </h1>
                
                <div className="d-grid gap-3">
                    <button className="shadow-lg btn btn-lg btn-grow" onClick={onResume} 
                    style={{ backgroundColor: '#28a745', color: 'white' }}>
                        RESUME GAME
                    </button>
                    
                    <button className="shadow-lg btn btn-grow" onClick={() => window.location.reload()} style={{ backgroundColor: '#dc3545', color: 'white',}}>
                        RESTART
                    </button>
                </div>
            </div>
        </div>
    );
};
