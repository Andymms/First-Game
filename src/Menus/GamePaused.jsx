import React from 'react';
import { useState, useEffect } from 'react';

export const GamePaused = ({ onResume }) => {

    useEffect(() => {
        window.gameState.isPaused = true;

        return () => {
            window.gameState.isPaused = false;
        };
    }, []);

    return (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center" 
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>

            <div className="card bg-dark border-primary shadow-lg p-4 text-center" style={{ width: '300px' }}>
                <h1 className="text-primary mb-4">PAUSED</h1>
                
                <div className="d-grid gap-3">
                    <button className="btn btn-primary btn-lg" onClick={onResume}>
                        RESUME GAME
                    </button>
                    
                    <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                        QUIT
                    </button>
                </div>
            </div>
        </div>
    );
};
