import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Table,
  Container,
} from "@mui/material";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import ReactDOM from "react-dom";

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
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [mortgageInterestRate, setMortgageInterestRate] = useState("");
  const [maintenanceRepairs, setMaintenanceRepairs] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [appreciation, setAppreciation] = useState("");
  const [tmpChart, setTmpChart] = useState("");
  const [chartData, setChartData] = useState(() => ({
    labels: [],
    datasets: [],
  }));

  useEffect(() => {
    if (tmpChart > 0) {
      generateChartData();
    }
  }, [tmpChart]);

  const tmpCharSet = () => {
    setTmpChart(1); // Convert the string back to a float for calculations
  };

  const generateChartData = ( ) => {
    // Extract the labels (years)
    const labels = ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15', 'Year 16', 'Year 17', 'Year 18', 'Year 19', 'Year 20', 'Year 21', 'Year 22', 'Year 23', 'Year 24', 'Year 25', 'Year 26', 'Year 27', 'Year 28', 'Year 29', 'Year 30'];

    // Extract and parse the data for remaining principal, interest paid, etc.
    const rentData = [1000.0, 1000.4551661356395, 1003.641329085116, 1012.2894856622668, 1029.1306326809286, 1056.8957669549386, 1098.3158852981337, 1156.1219845243513, 1233.0450614474282, 1331.8161128812017, 1455.1661356395084, 1605.8261265361857, 1786.5270823850703, 2000.0, 2248.9758761948106, 2536.185707783341, 2864.360491579426, 3236.2312243969045, 3654.5289030496124, 4121.984524351388, 4641.329085116066, 5215.293582157487, 5846.609012289486, 6538.0063723259, 7292.216659080563, 8111.970869367318, 9000.0, 9959.035047792446, 10991.807009558486, 12101.046882111968, 13289.485662266727];

    // Cumulatively calculate interest paid over the years
    const homeCostData = [1500.0, 1500.2962962962963, 1502.3703703703704, 1508.0, 1518.962962962963, 1537.037037037037, 1564.0, 1601.6296296296296, 1651.7037037037037, 1716.0, 1796.2962962962963, 1894.3703703703704, 2012.0, 2150.9629629629626, 2313.0370370370374, 2500.0, 2713.6296296296296, 2955.703703703704, 3228.0, 3532.296296296296, 3870.370370370371, 4244.0, 4654.962962962963, 5105.037037037037, 5596.0, 6129.6296296296305, 6707.703703703703, 7332.0, 8004.296296296297, 8726.370370370369, 9500.0];
    

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
 
  return (
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
        placeholder="1500"
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
        placeholder="400000"
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
        placeholder="30000"
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
        placeholder="10.5"
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
        placeholder="2000"
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
        placeholder="1500"
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
        placeholder="7.5"
        fullWidth
        value={appreciation}
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setAppreciation(parseFloat(e.target.value));
        }}
        margin="normal"
      />


      <StyledButton
        variant="contained"
        color="primary"
        onClick={tmpCharSet}
        style={{ marginTop: 20 }}
      >
        Calculate
      </StyledButton>

      {chartData.labels && chartData.labels.length > 0 && (
        <div>
          <Line data={chartData} style={{ marginTop: 20 }} />
          <div
            style={{ textAlign: "center", marginTop: 10, fontSize: "1.5em" }}
          >
            
          </div>
        </div>
      )}
      
    </StyledContainer>
  );
};

export default RentVsBuyCalculator;
