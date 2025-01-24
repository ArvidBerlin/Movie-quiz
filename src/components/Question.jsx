import React, { useState } from "react";

const Question = ({ question, onAnswer, timeLeft }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // If question is answered, show correct answer
    const handleClick = (option) => {
        setSelectedOption(option);
        const isCorrect = option === question.answer;

        // Wait 1.5 seconds until next question
        setTimeout(() => {
            setSelectedOption(null)
            onAnswer(isCorrect);
        }, 1500);
    };

    // Show question and answer options, along with timer
    return (
        <div className="quiz-container">
            <h2>{question.question}</h2>
            {question.options.map((option, index) => (
                <button 
                    key={index} 
                    onClick={() => handleClick(option)}
                    className={
                        selectedOption 
                        ? option === question.answer
                            ? "correct"
                            : selectedOption === option 
                            ? "incorrect" 
                        : "" 
                        : ""
                    }
                >
                    {option}
                </button>
            ))}
            <p>Time remaining: {timeLeft} seconds</p>
        </div>
    );
};

export default Question;