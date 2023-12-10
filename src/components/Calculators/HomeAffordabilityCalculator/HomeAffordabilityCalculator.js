import React, {useState, useEffect, useRef} from "react";
import {Button, Container,InputAdornment,TextField,IconButton, Stack} from '@mui/material';
//import styled from 'styled-components';
import styled from "@emotion/styled";
import { NumericFormat } from 'react-number-format';
import IMask from 'imask';

import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { useReactToPrint } from "react-to-print";

import CalculatorUsageGuide from "./CalculatorUsageGuide";


//import {PieChart } from '@mui/x-charts/PieChart';
//import { useDrawingArea } from '@mui/x-charts/hooks';
import { Chart as ChartJS, ArcElement,Tooltip, Legend,Title,PointElement,LineElement} from 'chart.js'
import { Pie, Doughnut } from "react-chartjs-2";
import { blueGrey, lightGreen } from "@mui/material/colors";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



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
  const[monthlyIncome, setMonthlyIncome] = useState(0); //Initially the start value will be 0
  const[monthlyDebt, setMonthlyDebt] = useState(0);
  const[downpaymentAmt, setDownpaymentAmt] = useState(0);
  const[YearlyHouseholdIncome, setYearlyHouseholdIncome]= useState(0); //this records the user's total household income
  const[totalHomeCost, setTotalHomeCost]  = useState(0);
  const[monthlyHomecost, setMonthlyHomeCost] = useState(0);

  const [ChartData, setChartData] = useState(() => ({
    labels: [],
    datasets: [],
  }));
  const [isGuideOpen, setModalOpen] = useState(false);


  const openGuide = () => setModalOpen(true);
  const closeGuide = () => setModalOpen(false);


  

  const formatNumber = (value) => {
    const options = { maximumFractionDigits: 2 };
    return new Intl.NumberFormat("en-US", options).format(value);
  };

  useEffect(() => {
    setChartData({
      labels: ['Debt', 'Home Payment', 'Other'],
      datasets: [{
        label: "Monthly Income Breakdown",
        data: [monthlyDebt, monthlyIncome * 0.28, monthlyIncome - (monthlyDebt + monthlyIncome * 0.28)],
        backgroundColor: ['#00ced1', '#9370db', '#8b008b'],
        borderColor: ['#00ced1', '#9370db', '#8b008b'],
        borderWidth: 1,
      }]
    });
  }, [ monthlyDebt,monthlyIncome, downpaymentAmt]); 

//Handler to reset the form
  const reload= () => {
    setMonthlyIncome(0);
    setMonthlyDebt(0);
    setDownpaymentAmt(0);
    setMonthlyHomeCost(0);
    setTotalHomeCost(0);
    setYearlyHouseholdIncome(0);
  }

  

  const calcmonthlyandtotalhomecost = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (monthlyIncome >= 0 && monthlyDebt >= 0) {
      const calculatedMonthlyHomeCost = (monthlyIncome - monthlyDebt) * 0.28;
      setMonthlyHomeCost(calculatedMonthlyHomeCost.toFixed(2));

      const calculatedTotalHomeCost = YearlyHouseholdIncome * 3;
      setTotalHomeCost(calculatedTotalHomeCost.toFixed(2));

    } else {
      alert('Please enter a valid input for income and/or debt');
    }




  }


  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Home Affordability Calculation Results",
  });

  return (
  <div ref={printRef}>
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

      <StyledTextField
        variant ="outlined"
        label="Enter Total Yearly Household Income"
        value = {YearlyHouseholdIncome}
        placeholder="$60,000"
        type="number"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        NumericFormat allowNegative={false} 
        margin="normal"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setYearlyHouseholdIncome(parseFloat(e.target.value));
        }}
      /> 





        
    <Stack direction="row" spacing={2}> 
      <StyledButton      
        variant="contained" 
        color="success"
        endIcon={<SendIcon />}
        onClick={calcmonthlyandtotalhomecost}
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

      <StyledButton      
        variant= "contained" 
        endIcon= {<PictureAsPdfIcon />}
        onClick={handlePrint}
        >
        PDF
      </StyledButton>

      </Stack>
      
      <ResultDisplay>You can Afford a Home with a Maximum Monthly Cost of: ${monthlyHomecost}</ResultDisplay>
      <ResultDisplay>Affordable Home Cost: ${formatNumber(totalHomeCost)}</ResultDisplay>   
      <div></div>

      <h2> Your Monthly Income Breakdown</h2>
      <div style ={{width:'40%', height: '40%', margin: 'auto', padding: '20px'}}>
        <Doughnut
          data = {ChartData}
        />
      </div>
  

    </StyledContainer>
  </div>
  );
};

export default HomeAffordabilityCalculator;
