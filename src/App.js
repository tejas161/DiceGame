import React from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import Swal from 'sweetalert2';


export default function App(){

     const [dice,setDice] = React.useState(allNewDice());
     const [tenzies,setTenzies] = React.useState(false);
     const [rolls,setRolls] = React.useState(0);

     React.useEffect(() => {

         const allHeld = dice.every(die => die.isHeld);
         const firstValue = dice[0].value;
         const allSameValue = dice.every(die => die.value === firstValue);

         if(allHeld && allSameValue)
         {
             console.log(rolls);
             if(rolls<10)
             {
             Swal.fire(
                'Good job!',
                `You used only ${rolls} Dice rolls!`,
                'success'
              )
             }
             else{
                Swal.fire(
                    'Try Once more',
                    `You took ${rolls} Dice rolls!`,
                    'question'
                  )

             }
             setRolls(0);
             setTenzies(true);
             
             
         }


     }, [dice]);

     function generateNewDie()
     {
         return {
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
         }
     }

    function allNewDice()
    {
        
        const newDice=[];
        for(let i=0;i<10;i++)
        {
            newDice.push(generateNewDie());
        }
        return newDice;
    }
     
    function rollDice()
    {
        if(!tenzies)
        {
        setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                die : 
                generateNewDie()
        })
        

        )
        setRolls(prevalue => prevalue+1);
    }
    else{
        setTenzies(false);
       
        setDice(allNewDice());
    }
    }

    function holdDice(id)
    {
            setDice(oldDice => oldDice.map(die => 
                {
                return die.id===id ? 
                {...die,isHeld : !die.isHeld} : 
                die
                }))
    }


    const diceElements = dice.map(die => 
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    )

    return(
        <main>
            {tenzies && <Confetti/>}
             <h1 className="title">Dice Equalizer</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
            {diceElements}
           
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll" }</button>

        </main>
    )
}