import React from 'react'

const StartPage = ({ onStart }) => {
  return (
    <div className='start-page'>
        <h1>The Movie Quiz!</h1>
        <p>Test your knowledge in movies to see if you're a real movie buff</p>
         <button onClick={() => { 
        console.log("Start button clicked!"); // ✅ Kolla om detta syns i konsolen
        onStart(); 
      }}>
          Start Quiz
          <img
            src="/clapperboard.svg"
            alt="Clapperboard"
            className="button-icon"
          />
        </button>
    </div>
  );
};

export default StartPage;