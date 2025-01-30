import React, { useEffect, useState, useRef } from "react";

const Question = ({ question, onAnswer, timeLeft, showCorrectAnswer, onGoToStart, currentQuestion, totalQuestions }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    // Reference for focus element
    const questionRef = useRef(null);

    const dummyDivRef = useRef(null);

    // Apply focus on element when new question loads
    useEffect(() => {
        setTimeout(() => {
            if (questionRef.current) {
                questionRef.current.focus();
            }

            if (dummyDivRef.current) {
                dummyDivRef.current.click();
            }
        }, 100);
    }, [question]);

    // Reset hasAnswered when new question is loaded
    useEffect(() => {
        setHasAnswered(false);
        setSelectedOption(null);
    }, [question]);

    // If question is answered, show correct answer
    const handleClick = (option) => {
        const isCorrect = option === question.answer;
        setSelectedOption(option);
        setHasAnswered(true);
        onAnswer(isCorrect);
    };

    return (
        <>
            {/* Osynlig div som "klickas" på för att ta bort oönskat fokus */}
            <div
                ref={dummyDivRef}
                style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
                tabIndex="-1">
            </div>

            // Show question and answer options
            <div className="question-page">
                {/* Connect focus-reference to h2 element */}
                <h2 ref={questionRef} tabIndex="0">{question.question}</h2> 
                
                {/* Correct/incorrect answer feedback */}
                {question.options.map((option, index) => (
                    <button 
                    key={`${question.question}-${index}`}
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

                {/* Display timer, hide when question is answered */}
                {!hasAnswered && (
                    <p>
                        Time remaining: <span className={timeLeft >= 6 ? "time-green" : "time-red"}>{timeLeft} seconds</span> 
                    </p>
                )}

                {/* Hide back to start button when question is answered */}
                {!hasAnswered && (
                    <button className="back-button" onClick={onGoToStart}>
                        Back to Start
                    </button>
                )}
            </div>
        </>
    );
};

export default Question;