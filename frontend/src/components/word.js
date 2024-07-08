import React from 'react'

const Word = ({selectedword, correctLetters}) => {
  return (
    <div className="word">
        {
            selectedword.split('').map( (letter, i) => {
                return (
                    <span className="letter" key={i}>
                        {correctLetters.includes(letter) ? letter: ''}
                    </span>
                )
            })
        }
      
    </div>
  )
}

export default Word