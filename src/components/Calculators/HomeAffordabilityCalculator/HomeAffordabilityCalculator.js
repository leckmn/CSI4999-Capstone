import React from "react";
import {useState} from 'react'; // used to remember states
import './index.css'
import ReactDOM from "react-dom";
import styled from "styled-components";
import box from '@mui/material'
import TextField from '@mui/material';
//import Stack from '@mui/material/Stack';
//import Button from '@mui/material/Button';


function HomeAffordabilityCalculator() {
  const[monthlyIncome, setMonthlyIncome]= useState(0) //Initially the start value will be 0
  const[monthlyDebt, setMonthlyDebt]=useState(0)
  const[downpaymentAmt, setDownpaymentAmt] = useState(0)
  //const[totalHomeCost, setTotalHomeCost] = useState('')
  const[monthlyHomecost, setMonthlyHomeCost] = useState('')
  //const[message, setMessage] = useState('')


// All function and work should be f4 return statement 



let calcmonthlyhomecost =(event) =>{
  //cancel default action 
  event.preventDefault();

  //Validations to prevent invalid input
  if(monthlyIncome ===0 | monthlyDebt === 0 ){
    alert('Please enter a valid input')
  } else{
     //Calculations to display monthly cost
    let monthlyHomecost = (monthlyIncome - monthlyDebt) * 0.28   // No more than 28% of net income should go for home costs
    setMonthlyHomeCost(monthlyHomecost.toFixed(2)) // returns monthly home costs in a decimal format
  }
  //Calculations to display total home cost user can afford

}

//Reload the current page, i.e. clear all inputs 
let reload =() => {
  window.location.reload()
}
  return (
    <div className="HomeAffordabilityCalculator">
    <div className='container'></div>
      <h2 className='center'> Home Affordability Calculator </h2>
      <form onSubmit={calcmonthlyhomecost}>

        <div>
          <label>Monthly Income: </label>
          < input 
            placeholder ="Enter Monthly Income" 
            //type = "number"
            //pattern="[0-9]*" // User can enter only numbers
            value={monthlyIncome} 
            onChange={(e)=>setMonthlyIncome(e.target.value)} />
        </div>

        <div>
          <label> Total Monthly Debt:</label>
          <input 
          placeholder = "Enter total monthly debt" 
          //type = "number"
          pattern="[0-9]*" // User can enter only numbers
          value={monthlyDebt} 
          onChange={(event) => setMonthlyDebt(event.target.value)} />
        </div>

        <div>
          <label> Downpayment Amount: </label>
          < input 
            placeholder = "Enter downpayment Amount" 
            //type = "number"
            pattern="[0-9]*"
            value={downpaymentAmt} 
            onChange={(event2)=> setDownpaymentAmt(event2.target.value)}/>      
        </div>


        <div>

            <button className='btn' type='submit'>Submit </button>
            <button className=' btn btn-outline' onClick={reload} type='submit'>Clear</button>
          
        
        </div>

        <div className='center'>
          <h3>Your monthly home cost is:{monthlyHomecost}  </h3>
        </div>
      </form>

    </div>
  );
}



const HomeAffordabilityCalculator = () => {
  return <div>Home Affordability Calculator</div>;
};

export default HomeAffordabilityCalculator;
