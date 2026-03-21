import React from 'react';
import './Menus.css';

export const GameOver = ({ level }) => {
    return (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center game-over-overlay">
            
            <div className="text-center p-5" 
                style={{ minWidth: '400px' }}>
                
                <h1 className="display-1 fw-bold text-danger mb-2">WASTED</h1>
                <p className="fs-3 text-white mb-4">You survived until Level {level}</p>
                
                <div className="d-grid gap-3">
                    <button 
                        className="btn btn-danger btn-lg btn-grow p-3 fw-bold" 
                        onClick={() => window.location.reload()}
                    >
                        TRY AGAIN
                    </button>
                    
                    {/* <button 
                        className="btn btn-outline-light btn-grow" 
                        onClick={() => window.location.href = '/'}
                    >
                        QUIT TO MAIN MENU
                    </button> */}
                </div>
            </div>
        </div>
    );
};