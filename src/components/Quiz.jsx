import React, { useState, useEffect } from "react"
import Question from "./Question"
import Result from "./Result"
import StartPage from "./StartPage";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [hasStarted, setHasStarted] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    // Load questions from JSON
    useEffect(() => {
        fetch("./questions.json")
        .then((response) => response.json())
        .then((data) => setQuestions(data));
    }, []);

    // Timer for each question
    useEffect(() => {
        if (timeLeft > 0 && !isFinished) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            handleTimeout();
        }
    }, [timeLeft, isFinished]);

    const handleTimeout = () => {
        setShowCorrectAnswer(true);
        setTimeout(() => {
            setShowCorrectAnswer(false);
            nextQuestion(false);
        }, 1500)
    }

    // Add point and move to next question after answer, or finish quiz
    const nextQuestion = (isCorrect) => {
        if (isCorrect) 
            setScore(score + 1);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(15);
        } else {
            setIsFinished(true);
        }
    };

    // Go back to start page and reset quiz
    const goToStartPage = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setIsFinished(false);
        setTimeLeft(15);
        setHasStarted(false);
    }

    // Load questions
    return (
        <>
            {hasStarted && !isFinished && (
                <div className="question-container">
                    <Question
                        question={questions[currentQuestionIndex]}
                        onAnswer={(isCorrect) => {
                            setShowCorrectAnswer(true);
                            setTimeout(() => {
                                setShowCorrectAnswer(false);
                                nextQuestion(isCorrect);
                            }, 1500);
                        }}
                        timeLeft={timeLeft}
                        showCorrectAnswer={showCorrectAnswer}
                        onGoToStart={goToStartPage}
                    />
                </div>
            )}
            
            {!hasStarted && ( // If quiz hasn't started, show start page until user starts quiz
                <StartPage onStart={() => setHasStarted(true)}/> 
            )}
            
            {isFinished && ( // If quiz is finished, show score and give option to restart
                <Result
                    score={score}
                    total={questions.length}
                    onRestart={goToStartPage}
                />
            )}
        </>
    );
};

export default Quiz;