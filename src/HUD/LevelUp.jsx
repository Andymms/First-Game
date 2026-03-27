import React from "react";
import './HUD.css';

export const LevelUp = ({ level }) => {
    return (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center level-up-overlay ui-overlay">
            <div className="p-4 text-center">
                <h1 className="ui-text level-up-title level-up-text">
                    LEVEL UP! {level}
                </h1>
            </div>
        </div>
    );
};