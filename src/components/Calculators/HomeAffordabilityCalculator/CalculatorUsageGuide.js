import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MortgageFormulaImage from "../../../images/MortgageFormula.png";

const CalculatorUsageGuide = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxWidth: "600px",
          overflowX: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#2e7d32",
          color: "white",
          position: "relative",
        }}
      >
        How It Works
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <p>
          <strong>Understanding the Home Affordability Calculator:</strong>
          <br />
          This calculator helps you determine an affordable monthly home payment, given your current financial standing. 
          The factors that this calculator takes into consideration include:
          <ul>
            <li>
              <strong>Monthly Income:</strong> Your current monthly net income.
            </li>
            <li>
              <strong>Monthly Debts:</strong> Any recurring monthly debt that you may have. This includes any student loans, phone loans, personal loans,  
              auto loans, gym membership, etc.
            </li>
            <li>
              <strong>Total Downpayment:</strong> Any savings, investments, or down payment that you currently have saved up have towards your home.
            </li>
            <li>
              <strong>Total Annual Household Income:</strong> The total income your household generates yearly.
            </li>
          </ul>
        </p>
        <p>
          <strong>Factors that Affect Home Affordability:</strong>
          <br />
          Financial experts recommend allocating no more than 28% of your monthly income to go towards your home payment costs. 
          To detemine the most optimal solution, we've used the following calculation:
          <p> 28% of monthly  income = [ Monthly Salary - Monthly Debt ] * 0.28 </p>
          
        </p>

        <p>
        <strong>Determining an Affordable Home Price:</strong> <br/>
        Experts recommend that the cost of your home should be approximately 3 times your annual household income.
        </p>
        <p>
          

        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorUsageGuide;
