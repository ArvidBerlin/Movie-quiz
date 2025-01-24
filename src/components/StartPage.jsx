import React from 'react'

const StartPage = ({ onStart }) => {
  return (
    <div className='container'>
        <h1>The Movie Quiz!</h1>
        <p>Test your knowledge in movies to see if you're a real movie buff</p>
        <button onClick={onStart}>
            Start Quiz
        </button>
    </div>
  );
};

export default StartPage;