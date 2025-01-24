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

    // Load questions from JSON
    useEffect(() => {
        fetch("./questions.json")
        .then((response) => response.json())
        .then((data) => setQuestions(data));
    }, []);

    // Timer for each question
    useEffect(() => {
        if (timeLeft > 0 && !isFinished && hasStarted) {
            const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !isFinished) {
            nextQuestion();
        }
    }, [timeLeft, hasStarted]);

    // Add point if answer is correct
    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore(score + 1);
        nextQuestion();
    };

    // Move to next question after answer, or finish quiz
    const nextQuestion = () => {
        setTimeLeft(10);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsFinished(true);
        }
    };

    // Reset quiz to start over
    const resetQuiz = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setIsFinished(false);
        setTimeLeft(10);
    };

    // If quiz hasn't started, show start page until user starts quiz
    if (!hasStarted) {
        return <StartPage onStart={() => setHasStarted(true)}/>;
    }

    // If quiz is finished, show score and give option to restart
    if (isFinished) {
        return (
            <Result 
                score={score} 
                total={questions.length} 
                onRestart={resetQuiz} 
                onGoToStart={() => setHasStarted(false)}
            />
        );
    }

    // Load questions
    return questions.length > 0 ? (
        <div>
            <Question 
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                timeLeft={timeLeft}
            />
        </div>
    ) : (
        <p>Loading questions...</p>
    );
};

export default Quiz;