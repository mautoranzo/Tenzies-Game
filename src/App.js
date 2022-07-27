import React from "react";
import Die from "./components/Die";
import Confetti from 'react-confetti'

function App() {
  const [won,setWon] = React.useState(false)
  const [diceArray,setDiceArray] = React.useState(allNewDice())

console.log(won)


  React.useEffect(() =>{
    if(diceArray.every(dice => dice.freeze && dice.value===diceArray[0].value)) setWon(true)
  },[diceArray])
  
  function allNewDice(){
    const dice = []
    for(let i=1; i<11; i++){
      dice.push({id: i, freeze: false, value: (Math.ceil(Math.random()*6))})
    }
    return dice
  }
  
  function roll(){
    if(!won){
    setDiceArray(prev=>prev.map(die => die.freeze? {...die }: {...die, value: (Math.ceil(Math.random()*6))}))
    }else{
      setDiceArray(allNewDice())
      setWon(false)
    }
  }

    

  function freezeDie(id){
    setDiceArray(prev => prev.map(die => die.id===id? {...die, freeze: !die.freeze} : {...die}))

  }

  const dice = diceArray.map((die) => <Die key={die.id} freezeDie={freezeDie} id={die.id} value={die.value} freeze={die.freeze}/>) 

  return (
    <main className="App">
      {won && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dice}
      </div>
      <button className={won && "restart"} onClick={roll}>{won? "Restart Game": "Roll"}</button>
    </main>
  );
}

export default App;
