import React from 'react'
import { checkWin } from '../helpers/helpers';
import { useEffect } from 'react';

const Popup = ( {correctLetters, wrongLetters, selectedword, setPlayable, playAgain}) => {
    let finalMessage = "";
    let finalMessageRevealedWord = "";
    let playable = true;

    if ( checkWin(correctLetters, wrongLetters, selectedword) === 'win') {
        finalMessage = "Congratulations! You won! 🥳🤩";
        playable = false;
    }
    else if( checkWin(correctLetters, wrongLetters, selectedword) === 'lose') {
        finalMessage = "Unfortunately, you lost! 😭💀";
        finalMessageRevealedWord = `...the word was: ${selectedword}`;
        playable = false 
    }

    useEffect(() => setPlayable(playable))
  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'}: {}}   >
        <div className="popup">
            <h2>{finalMessage}</h2>
            <h3>{finalMessageRevealedWord}</h3>
            <button onClick={playAgain}>Play Again!</button>
        </div>
    </div>
  )
}

export default Popup
