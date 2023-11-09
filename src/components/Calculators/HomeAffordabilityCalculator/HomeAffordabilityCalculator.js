import React, {useState, useEffect} from "react";
import {Button, Container,InputAdornment,TextField,IconButton, Stack} from '@mui/material';
//import styled from 'styled-components';
import styled from "@emotion/styled";
import { NumericFormat } from 'react-number-format';
import IMask from 'imask';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import CalculatorUsageGuide from "./CalculatorUsageGuide";

const StyledContainer = styled(Container)`
margin-top: 160px;
margin-bottom: 60px;
padding-top: 40px;
background-color: #f7f9fc;
border-radius: 10px; // Rounded corners
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); // A slight shadow for depth
padding: 40px; // Uniform padding
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #455a64; 
    transform: translateY(-2px); 
  }
`;
const ResultDisplay = styled.p`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #2e7d32;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #64b5f6;
    }

    & .MuiInputLabel-root {
      font-weight: 500;
    }
  }
`; 


const HomeAffordabilityCalculator = () => {
  const[monthlyIncome, setMonthlyIncome] = useState(""); //Initially the start value will be 0
  const[monthlyDebt, setMonthlyDebt] = useState("");
  const[downpaymentAmt, setDownpaymentAmt] = useState("");
  //const[totalHomeCost, setTotalHomeCost]  = useState("");
  const[monthlyHomecost, setMonthlyHomeCost] = useState("");
  //const[message, setMessage] = useState('')

  const [isGuideOpen, setModalOpen] = useState(false);
  const openGuide = () => setModalOpen(true);
  const closeGuide = () => setModalOpen(false);


  // let calculatemonthlyhomecost =() => {
  //   if (monthlyIncome > 0 |monthlyDebt > 0 |downpaymentAmt >= 0){
  //        const monthlyHomeCost = (monthlyIncome - monthlyDebt) * 0.28 
  //        setMonthlyHomeCost(parseFloat(monthlyHomecost.fixed(2))); 
  //   }
  //   else{
  //     alert("Please enter valid data within the fields above ")
  //   }
  // };


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
  let reload =() => {
    window.location.reload()
  }

  return (
    <StyledContainer>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Home Affordability Calculator
      </h1>    
      <StyledTextField
        variant ="outlined"
        label="Enter Monthly Income"
        value = {monthlyIncome} //causes the field to become permanatly 0
        placeholder="$6,000"
        type="number"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        NumericFormat allowNegative={false} 
        margin="normal"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setMonthlyIncome(parseFloat(e.target.value));
        }}
      />
    <StyledTextField
        variant ="outlined"
        label="Enter Total Monthly Debt"
        value = {monthlyDebt}
        placeholder="$1,500"
        type="number"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        NumericFormat allowNegative={false} 
        margin="normal"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setMonthlyDebt(parseFloat(e.target.value));
        }}
      />
          <StyledTextField
        variant ="outlined"
        label="Enter Downpayment Amount"
        placeholder="5,000"
        value={downpaymentAmt}
        type="number"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        NumericFormat allowNegative={false} 
        margin="normal"

        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setDownpaymentAmt(parseFloat(e.target.value));
        }} 
        
      />


    <Stack direction="row" spacing={2}>
      <StyledButton      
        variant="contained" 
        endIcon={<SendIcon />}
        onClick={calcmonthlyhomecost}
      >
        Calculate
      </StyledButton>
  
      <StyledButton      
        variant= "contained" 
        endIcon= {<DeleteIcon />}
        onClick= {reload}
      >
        Clear
      </StyledButton>
      
      
      <StyledButton      
        variant= "contained" 
        endIcon= {<LiveHelpIcon />}
        onClick= {openGuide}
      >
        Help
      </StyledButton>
      <CalculatorUsageGuide open={isGuideOpen} onClose={closeGuide} />
      </Stack>
      <div></div>
      
      <ResultDisplay>You can Afford a Home with a Maximum Monthly Cost of: ${monthlyHomecost}</ResultDisplay>

    </StyledContainer>
  

  );
};



export default HomeAffordabilityCalculator;
