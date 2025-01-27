import React from "react";

// Show player result and option to play again
const Result = ({ score, total, onRestart, onGoToStart }) => {
    return (
        <div className="result-page">
            <h2>Quiz finished!</h2>
            <p>
                You got {score} of {total} correct!
            </p>
            <button onClick={onRestart}>Play again</button>
            <button onClick={onGoToStart}>Start Page</button>
        </div>
    );
};

export default Result;