import React, {useState, useEffect, useRef} from "react";
import {
  Button,
  TextField,
  Table,
  Container,
} from "@mui/material";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import ReactDOM from "react-dom";
import InfoModal from "./InfoModal";
import { useReactToPrint } from "react-to-print";
import Header from ".././../Header/Header";
import ErrorModal from "./ErrorModal";


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
    background-color: #455a64; // Slightly darken on hover
    transform: translateY(-2px); // Gives a subtle "lift" effect
  }
`;

const ResultDisplay = styled.p`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #2e7d32;
`;

const StyledTable = styled(Table)`
  margin-top: 20px;

  && .MuiTableHead-root .MuiTableCell-head {
    background-color: #f5f5f5;
    font-weight: bold;
    border-bottom: 2px solid #aaa; /* A border for separation */
  }

  & .MuiTableRow-root:nth-of-type(even) {
    background-color: #f5f5f5;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #64b5f6;
    }
    // Added prominent font-weight to the label
    & .MuiInputLabel-root {
      font-weight: 500;
    }
  }
`;

const RentVsBuyCalculator = () => {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [annualRentIncrease, setAnnualRentIncrease] = useState("");
  const [secDep, setSecDep] = useState("");
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [mortgageInterestRate, setMortgageInterestRate] = useState("");
  const [maintenanceRepairs, setMaintenanceRepairs] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [appreciation, setAppreciation] = useState("");
  const [tmpChart, setTmpChart] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [chartData, setChartData] = useState(() => ({
    labels: [],
    datasets: [],
  }));

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openErrorModal = (message) => {
    setErrorMessage(message);
    setErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
    setErrorMessage("");
  };

  useEffect(() => {
    if (tmpChart > 0) {
      generateChartData();
    }
  }, [tmpChart]);

  const tmpCharSet = () => {
    setTmpChart(1); // Convert the string back to a float for calculations
  };

  const generateChartData = ( ) => {
    if (monthlyRent === undefined || monthlyRent === null || monthlyRent === "" ||
        annualRentIncrease === undefined || annualRentIncrease === null || annualRentIncrease === "" ||
        secDep === undefined || secDep === null || secDep === "" ||
        homePrice === undefined || homePrice === null || homePrice === "" ||
        downPayment === undefined || downPayment === null || downPayment === "" ||
        mortgageTerm === undefined || mortgageTerm === null || mortgageTerm === "" ||
        mortgageInterestRate === undefined || mortgageInterestRate === null || mortgageInterestRate === "" ||
        maintenanceRepairs === undefined || maintenanceRepairs === null || maintenanceRepairs === "" ||
        propertyTax === undefined || propertyTax === null || propertyTax === "" ||
        appreciation === undefined || appreciation === null || appreciation === ""
        ) {
          openErrorModal("Please fill all the fields before calculating.");
          return;
        }
    
    // Extract the labels (years)
    const labels = [];

    for (let i=0; i<=mortgageTerm; i++){
      labels.push(`Year ${i}`)
    }

    // Rent information
    const rentData = [];
    let rentCurrent = monthlyRent;
    let rentSum = secDep;
    rentData.push(rentSum);

    for (let i=0; i<=mortgageTerm; i++){
      rentSum += rentCurrent*12;
      rentCurrent *= 1+(annualRentIncrease/100);
      rentData.push(rentSum);
    }

    // Cumulatively calculate interest paid over the years
    let homeCostData = [];

    let adjustHomePrice = homePrice;
    let totalMonthlyOld = 0;
    let homeSum = downPayment;

    for (let i=0; i<=mortgageTerm; i++){
      let principal = adjustHomePrice - downPayment;
      let monthlyInterestRate = mortgageInterestRate / 100 / 12;
      let numberOfPayments = mortgageTerm * 12;

      let top = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
      let bottom = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

      let rawMortgage = principal * (top / bottom);
      let totalMonthly = rawMortgage + propertyTax;
      totalMonthly *= 1 - appreciation/100;

      homeSum += totalMonthly*12;

      homeCostData.push(homeSum);
      adjustHomePrice *= 1 + (appreciation/100);
      
    }

    let switchingPoint = -1;
    for (let i=0; i<=mortgageTerm; i++){
      if(homeCostData[i] < rentData[i] && switchingPoint === -1){
        switchingPoint = i;
      }
    }

    if(switchingPoint === -1){
      setResultMessage("Buying will never be cheaper than renting");
    } else {
      setResultMessage(`Buying will be cheaper in ${switchingPoint} years`);
    }
    
    

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Rent Cumulative Total",
          data: rentData,
          fill: false,
          backgroundColor: "red",
          borderColor: "red",
        },
        {
          label: "Home Cumulative Total",
          data: homeCostData,
          fill: false,
          backgroundColor: "blue",
          borderColor: "blue",
        },
      ],
    });
  };

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Mortgage Calculation Results",
  });
 
  return (
    <div ref={printRef}>
      <Header />
      <StyledContainer>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Rent vs Buy Calculator
        </h1>
        <h1 style={{ textAlign: "", marginBottom: "10px" }}>
          Rent Information
        </h1>
        <StyledTextField
          variant="outlined"
          label="Monthly Rent ($)"
          type="number"
          placeholder="2500"
          fullWidth
          value={monthlyRent}
          InputProps={{
            inputProps: { min: 0 },
          }}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setMonthlyRent(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
          variant="outlined"
          label="Security Deposit ($)"
          type="number"
          placeholder="2500"
          fullWidth
          value={secDep}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setSecDep(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
            variant="outlined"
            label="Annual Rent Increase (%)"
            type="number"
            placeholder="2.5"
            fullWidth
            value={annualRentIncrease}
            onChange={(e) => {
              e.target.value = e.target.value < 0 ? 0 : e.target.value;
              setAnnualRentIncrease(parseFloat(e.target.value));
            }}
            margin="normal"
          />

        <h1 style={{ textAlign: "", marginTop: "30px", marginBottom: "10px" }}>
          Home Information
        </h1>
        <StyledTextField
          variant="outlined"
          label="Home Price ($)"
          type="number"
          placeholder="250000"
          fullWidth
          value={homePrice}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setHomePrice(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
          variant="outlined"
          label="Down payment ($)"
          type="number"
          placeholder="50000"
          fullWidth
          value={downPayment}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setDownPayment(parseFloat(e.target.value));
          }}
          margin="normal"
        />
          
          <StyledTextField
          variant="outlined"
          label="Mortgage Term (yr)"
          type="number"
          fullWidth
          value={mortgageTerm}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setMortgageTerm(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
          variant="outlined"
          label="Mortgage Interest Rate (%)"
          type="number"
          placeholder="3.75"
          fullWidth
          value={mortgageInterestRate}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setMortgageInterestRate(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
          variant="outlined"
          label="Annual Home Maintenance and Repairs ($)"
          type="number"
          placeholder="250"
          fullWidth
          value={maintenanceRepairs}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setMaintenanceRepairs(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
          variant="outlined"
          label="Property Tax ($)"
          type="number"
          placeholder="250"
          fullWidth
          value={propertyTax}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setPropertyTax(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
          variant="outlined"
          label="Appreciation Rate"
          type="number"
          placeholder="3.5"
          fullWidth
          value={appreciation}
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setAppreciation(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <ButtonContainer>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={generateChartData}
            style={{ marginTop: 20 }}
          >
            Calculate
          </StyledButton>
          <StyledButton
              variant="outlined"
              color="primary"
              onClick={openModal}
              style={{ marginLeft: 10 }}
            >
            Guide
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handlePrint}
            style={{ marginLeft: "auto" }}
          >
            PDF
          </StyledButton>  
        </ButtonContainer>
        <InfoModal open={isModalOpen} onClose={closeModal} />
        <ResultDisplay>{resultMessage}</ResultDisplay>
        {chartData.labels && chartData.labels.length > 0 && (
          <div>
            <Line data={chartData} style={{ marginTop: 20 }} />
            <div
              style={{ textAlign: "center", marginTop: 10, fontSize: "1.5em" }}
            >
              
            </div>
          </div>
        )}
        <ErrorModal
            open={errorModalOpen}
            onClose={closeErrorModal}
            errorMessage={errorMessage}
          />
      </StyledContainer>
    </div>
  );
};

export default RentVsBuyCalculator;
