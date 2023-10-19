import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem, Container } from "@mui/material";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";

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

const DebtToIncomeCalculator = () => {
  const [monthlyDebt, setMonthlyDebt] = useState(0);
  const [grossIncome, setGrossIncome] = useState(0);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(null);

  const calculateRatio = () => {
    if (grossIncome === 0) {
      // Handle division by zero error or any other validation
      setDebtToIncomeRatio(null);
    } else {
      const ratio = (monthlyDebt / grossIncome) * 100;
      setDebtToIncomeRatio(ratio.toFixed(2)); // Round to two decimal places
    }
  };
  return (
    <StyledContainer>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Debt to Income Ratio Calculator
      </h1>
      <StyledTextField
        variant="outlined"
        label="Recurring monthly debt"
        type="number"
        fullWidth
        value={monthlyDebt}
        InputProps={{
          inputProps: { min: 0 },
        }}
        placeholder="e.g. 500"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setMonthlyDebt(parseFloat(e.target.value));
        }}
        margin="normal"
      />

      <StyledTextField
        variant="outlined"
        label="Gross Income"
        type="number"
        fullWidth
        value={grossIncome}
        placeholder="e.g. 4000"
        onChange={(e) => {
          e.target.value = e.target.value < 0 ? 0 : e.target.value;
          setGrossIncome(parseFloat(e.target.value));
        }}
        margin="normal"
      />
      <StyledButton
        variant="contained"
        color="primary"
        onClick={calculateRatio}
        style={{ marginTop: 20 }}
      >
        Calculate
      </StyledButton>

      <ResultDisplay>Debt to Income Ratio: %{debtToIncomeRatio}</ResultDisplay>
    </StyledContainer>
  );
};

export default DebtToIncomeCalculator;
