// import React from "react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

// Style the container for a centered look
const StyledContainer = styled(Container)`
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
  margintop: 20px;

  & .MuiTableHead-root {
    background-color: #e0e0e0;
  }

  & .MuiTableRow-root:nth-of-type(odd) {
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

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [term, setTerm] = useState(30);
  const [interestRate, setInterestRate] = useState("");
  const [propertyTaxes, setPropertyTaxes] = useState("");
  const [homeInsurance, setHomeInsurance] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [amortization, setAmortization] = useState([]);
  const [chartData, setChartData] = useState(() => ({
    labels: [],
    datasets: [],
  }));

  useEffect(() => {
    if (monthlyPayment > 0) {
      computeAmortization();
      generateChartData();
    }
  }, [monthlyPayment]);

  const computeMonthlyPayment = () => {
    const principal = homePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;

    const top =
      monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const bottom = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

    const rawMortgage = principal * (top / bottom);
    const totalMonthly = rawMortgage + propertyTaxes + homeInsurance;

    setMonthlyPayment(parseFloat(totalMonthly.toFixed(2))); // Convert the string back to a float for calculations
  };
  function formatNumber(number) {
    return parseFloat(number).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const computeAmortization = () => {
    const principalAmount = homePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;

    let remaining = principalAmount;
    const amortizationData = [];
    const pureMortgagePayment = monthlyPayment - propertyTaxes - homeInsurance;

    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let i = 0; i < numberOfPayments; i++) {
      const monthlyInterest = remaining * monthlyInterestRate;
      let monthlyPrincipal = pureMortgagePayment - monthlyInterest;

      yearlyInterest += monthlyInterest;
      yearlyPrincipal += monthlyPrincipal;

      if (i === numberOfPayments - 1) {
        // Adjust the last principal amount to match the remaining balance
        monthlyPrincipal = remaining;
        yearlyPrincipal += remaining - monthlyPrincipal;
      }

      remaining -= monthlyPrincipal;

      if ((i + 1) % 12 === 0 || i === numberOfPayments - 1) {
        amortizationData.push({
          year: (i + 1) / 12,
          interest: formatNumber(yearlyInterest),
          principal: formatNumber(yearlyPrincipal),
          remaining: formatNumber(remaining),
        });

        // Reset yearly accumulations
        yearlyInterest = 0;
        yearlyPrincipal = 0;
      }
    }

    setAmortization(amortizationData);
    generateChartData(amortizationData);
  };

  function parseValue(value) {
    return parseFloat(value.replace(/[$,]/g, ""));
  }

  const generateChartData = (amortizationData) => {
    if (!amortizationData || amortizationData.length === 0) return;

    // Extract the labels (years)
    const labels = amortizationData.map((a) => `Year ${a.year}`);

    // Extract and parse the data for remaining principal, interest paid, etc.
    const remainingData = amortizationData.map((a) => parseValue(a.remaining));

    // Cumulatively calculate interest paid over the years
    const interestPaidData = [];
    let accumulatedInterest = 0;
    for (let a of amortizationData) {
      accumulatedInterest += parseValue(a.interest);
      interestPaidData.push(accumulatedInterest);
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Remaining Principal",
          data: remainingData,
          fill: false,
          backgroundColor: "red",
          borderColor: "red",
        },
        {
          label: "Interest Paid",
          data: interestPaidData,
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
        Mortgage Calculator
      </h1>
      <StyledTextField
        variant="outlined"
        label="Home Price"
        type="number"
        fullWidth
        value={homePrice}
        InputProps={{
          inputProps: { min: 0 },
        }}
        placeholder="e.g. 200000"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setHomePrice(parseFloat(e.target.value));
        }}
        margin="normal"
      />

      <StyledTextField
        variant="outlined"
        label="Down Payment"
        type="number"
        fullWidth
        value={downPayment}
        placeholder="e.g. 50000"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setDownPayment(parseFloat(e.target.value));
        }}
        margin="normal"
      />

      <Select
        variant="outlined"
        fullWidth
        value={term}
        onChange={(e) => setTerm(parseInt(e.target.value, 10))}
        margin="normal"
      >
        <MenuItem value={15}>15 Years</MenuItem>
        <MenuItem value={30}>30 Years</MenuItem>
      </Select>

      <StyledTextField
        variant="outlined"
        label="Interest Rate"
        type="number"
        fullWidth
        value={interestRate}
        placeholder="e.g. 7"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setInterestRate(parseFloat(e.target.value));
        }}
        margin="normal"
      />

      <StyledTextField
        variant="outlined"
        label="Property Taxes / Month"
        type="number"
        fullWidth
        value={propertyTaxes}
        placeholder="e.g. 250"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setPropertyTaxes(parseFloat(e.target.value));
        }}
        margin="normal"
      />

      <StyledTextField
        variant="outlined"
        label="Home Insurance / Month"
        type="number"
        fullWidth
        value={homeInsurance}
        placeholder="e.g. 150"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setHomeInsurance(parseFloat(e.target.value));
        }}
        margin="normal"
      />

      <StyledButton
        variant="contained"
        color="primary"
        onClick={computeMonthlyPayment}
        style={{ marginTop: 20 }}
      >
        Calculate
      </StyledButton>

      {/* <p style={{ marginTop: 20 }}>Monthly Payment: ${monthlyPayment}</p> */}
      <ResultDisplay>Monthly Payment: ${monthlyPayment}</ResultDisplay>

      <StyledTable style={{ marginTop: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Total Interest for the Year</TableCell>
            <TableCell>Total Principal for the Year</TableCell>
            <TableCell>Remaining Balance at Year End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {amortization.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.year}</TableCell>
              <TableCell>${row.interest}</TableCell>
              <TableCell>${row.principal}</TableCell>
              <TableCell>${row.remaining}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      {chartData.labels && chartData.labels.length > 0 && (
        <div>
          <Line data={chartData} style={{ marginTop: 20 }} />
          <div
            style={{ textAlign: "center", marginTop: 10, fontSize: "1.5em" }}
          >
            Total Interest Paid: $
            {formatNumber(
              amortization.reduce(
                (acc, curr) => acc + parseFloat(curr.interest.replace(",", "")),
                0
              )
            )}
          </div>
        </div>
      )}
    </StyledContainer>
  );
};

export default MortgageCalculator;
