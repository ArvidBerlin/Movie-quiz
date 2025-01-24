import React, { useState } from "react";

const Question = ({ question, onAnswer, timeLeft, showCorrectAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // If question is answered, show correct answer
    const handleClick = (option) => {
        const isCorrect = option === question.answer;
        setSelectedOption(option);
        onAnswer(isCorrect);
    };

    // Show question and answer options, along with correct/incorrect answer feeback and timer
    return (
        <div className="quiz-container">
            <h2>{question.question}</h2>
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
            <p>Time remaining: {timeLeft} seconds</p>
        </div>
    );
};

export default Question;