import React, { useState, useRef } from "react";
import { Button, TextField, Container } from "@mui/material";
import styled from "@emotion/styled";
import { Pie } from "react-chartjs-2";
import { useReactToPrint } from "react-to-print";

const StyledContainer = styled(Container)`
  margin-top: 160px;
  margin-bottom: 60px;
  padding-top: 40px;
  background-color: #f7f9fc;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 40px;
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

const DebtToIncomeCalculator = () => {
  const [debt, setDebt] = useState("");
  const [income, setIncome] = useState("");
  const [chartData, setChartData] = useState(null);
  /////////
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  /////////

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Mortgage Calculation Results",
  });
  const calculateRatio = () => {
    if (debt > 0 && income > 0) {
      const debtToIncomeRatio = (debt / income) * 100;
      const remainingRatio = 100 - debtToIncomeRatio;

      setChartData({
        labels: ["Debt", "Income"],
        datasets: [
          {
            data: [debtToIncomeRatio, remainingRatio],
            backgroundColor: ["red", "green"],
          },
        ],
      });
    }
  };
  return (
    <div ref={printRef}>
      <StyledContainer>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Debt to Income Ratio Calculator
        </h1>
        <StyledTextField
          variant="outlined"
          label="Recurring monthly debt"
          type="number"
          fullWidth
          value={debt}
          placeholder="e.g. 700"
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setDebt(parseFloat(e.target.value));
          }}
          margin="normal"
        />

        <StyledTextField
          variant="outlined"
          label="Gross monthly income"
          type="number"
          fullWidth
          value={income}
          placeholder="e.g. 4000"
          onChange={(e) => {
            e.target.value = e.target.value < 0 ? 0 : e.target.value;
            setIncome(parseFloat(e.target.value));
          }}
          margin="normal"
        />
        <div>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={calculateRatio}
            style={{ marginTop: 20 }}
          >
            Calculate DTI Ratio
          </StyledButton>
          {/* <StyledButton
          variant="outlined"
          color="primary"
          onClick={openModal}
          style={{ marginLeft: 10 }}
        >
          Guide
        </StyledButton> */}
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handlePrint}
            style={{ marginLeft: 20 }}
          >
            PDF
          </StyledButton>
        </div>

        {chartData && (
          <div>
            <div
              style={{ textAlign: "center", marginTop: 30, fontSize: "1.5em" }}
            >
              Debt-to-Income Ratio: {chartData.datasets[0].data[0].toFixed(2)}%
            </div>
            <div style={{ width: "300px", height: "300px", margin: "auto" }}>
              {" "}
              <Pie data={chartData} style={{ marginTop: 30 }} />
            </div>
          </div>
        )}
      </StyledContainer>
    </div>
  );
};

export default DebtToIncomeCalculator;
