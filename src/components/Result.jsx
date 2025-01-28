import React from "react";

// Show player result and option to play again
const Result = ({ score, total, onRestart, onGoToStart }) => {
    return (
        <div className="result-page">
            <h1>Quiz finished!</h1>
            <p>
                You got {score} of {total} correct!
            </p>
            <div className="button-container">
                <button className="restart-button" onClick={onRestart}>
                    Play again
                </button>
                <button className="start-button" onClick={onGoToStart}>
                    Start Page
                </button>
            </div>
        </div>
    );
};

export default Result;