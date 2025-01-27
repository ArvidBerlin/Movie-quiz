import React, { useState } from "react";

const Question = ({ question, onAnswer, timeLeft, showCorrectAnswer, onGoToStart, currentQuestion, totalQuestions }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // If question is answered, show correct answer
    const handleClick = (option) => {
        const isCorrect = option === question.answer;
        setSelectedOption(option);
        onAnswer(isCorrect);
    };

    return (
        // Show question and answer options
        <div className="question-page">
            <h2>{question.question}</h2> 
            
            {/* Correct/incorrect answer feedback */}
            {question.options.map((option, index) => (
                <button 
                    key={index} 
                    onClick={() => handleClick(option)}
                    className={
                        showCorrectAnswer 
                        ? option === question.answer
                            ? "correct"
                            : selectedOption === option 
                            ? "incorrect" 
                        : "" 
                        : ""
                    }
                    disabled={showCorrectAnswer} // Disable buttons after answer
                >
                    {option}
                </button>
            ))}

            {/* Display current question number and total question number */}
            <p className="question-tracker"> 
                Question {currentQuestion} out of {totalQuestions} 
            </p>

            {/* Display timer */}
            <p>
                Time remaining: <span className={timeLeft >= 6 ? "time-green" : "time-red"}>{timeLeft} seconds</span> 
                </p>
            <button className="back-button" onClick={onGoToStart}>
                Back to Start
            </button>
        </div>
    );
};

export default Question;