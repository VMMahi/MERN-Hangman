import React from "react"; //importing react app from node modules
import { useState } from "react"; //using the useState hook
import Header from "./components/Header" //import Header from components folder
import Figure from "./components/Figure" //import Figure component
import Wrongletters from "./components/Wrongletters"; // importing the Wrongletters component
import Word from "./components/word" // importing the Wrongletters component
import Notification from "./components/Notification"; // importing the Wrongletters component
import { useEffect } from "react"; // using the useEffect hook
import {showNotification as show} from "./helpers/helpers"; //importing the shownotification helper from the helper folders.
import Popup from "./components/Popup"; // importing the Popup component
import './App.css';

// const words = ["gemera", "carrera", "endaevour", "clio", "macan", "huracan", "enzo", "Valkyrie", "Mistral"]; //Array of car names, from which the words is chosen randomly from
// let words = []

// let selectedword = words[Math.floor(Math.random() * words.length)]; // selectedword stores the word to which the randomly generated index holds

// let words = []



// let playable = true; 


function App() {
  

  const [selectedword, setSelectedWord] = useState("");

// useEffect(() => {
//   const getCar = async () => {
//     const response = await fetch("/api/cars");

//     const json = response.json();
//     console.log(json);

//     setSelectedWord(json);
    
//   }
//   getCar();
//   words = selectedWord;
// }, [selectedWord])

const getCar = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/cars");
    if (!response.ok) {
      throw new Error("Failed to fetch car names");
    }
    const json = await response.json();
    console.log(json);
    let words = json; // Assign fetched car names to the words array
    const randomIndex = Math.floor(Math.random() * words.length);
    setSelectedWord(words[randomIndex].name);
  } catch (error) {
    console.error("Error fetching car names:", error);
  }
};

useEffect(() => {
  getCar();
}, []);


  const [playable, setPlayable] = useState(true); // playable state to enable play again after you have lost or won
  const [correctLetters, setCorrectLetters] = useState([]); // state to hold the correct letters from the selected word
  const [wrongLetters, setwrongLetters] = useState([]); // state to hold the wrongletters and display them 
  const [showNotification, setShowNotification] = useState(false); //notitification is set to false by default as you do not want any notification to pop up all the time

  useEffect(() => { //to get the input from the keyboard
    const handleKeydown = event => { //handle the input key
      const {key, keyCode} = event; //gets the letter and the ascii code on input
        if(playable && keyCode >= 65 && keyCode <=90) {
          const letter = key.toLowerCase(); //if true converts the input to lower case
          if(selectedword.includes(letter)) {
            if(!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
  
              // displayWord();
            } else {
              show(setShowNotification);
            }
          } else {
            if(!wrongLetters.includes(letter)) {
              setwrongLetters(wrongLetters => [...wrongLetters, letter]);
  
              // updateWrongLettersEl();
            } else{
              show(setShowNotification);
            }
  
          }
        }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
}, [correctLetters, wrongLetters, playable, selectedword]);
    
 function playAgain() {
  

  setPlayable(true);

  //Reset the arrays
  setCorrectLetters([]);
  setwrongLetters([]);

  // const random = Math.floor(Math.random() * words.length);
  // selectedword = words[random];
  getCar();
 }
    

  return (
    <>
    <Header /> {/* Importing the Header component from components*/}
    <div className="game-container">
      <Figure wrongLetters={wrongLetters} />
      <Wrongletters wrongLetters={wrongLetters} />
      <Word selectedword={selectedword} correctLetters={correctLetters} />
      
    </div>
    <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedword={selectedword} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App; 
