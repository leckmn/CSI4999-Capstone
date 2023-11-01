import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MortgageFormulaImage from "../../../images/MortgageFormula.png";

const InfoModal = ({ open, onClose }) => {
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
          <strong>Understanding the Mortgage Calculator:</strong>
          <br />
          This calculator helps you estimate your monthly mortgage payment. The
          main inputs are:
          <ul>
            <li>
              <strong>Home Price:</strong> The total price of the home you're
              purchasing.
            </li>
            <li>
              <strong>Down Payment:</strong> The upfront amount you're paying,
              typically expressed as a percentage of the home price.
            </li>
            <li>
              <strong>Loan Term:</strong> The number of years you have to repay
              the loan (e.g., 30 years).
            </li>
            <li>
              <strong>Interest Rate:</strong> The annual interest rate of the
              loan.
            </li>
            <li>
              <strong>Property Taxes:</strong> The monthly property tax amount.
            </li>
            <li>
              <strong>Home Insurance:</strong> Your monthly home insurance cost.
            </li>
          </ul>
        </p>
        <p>
          <strong>Amortization Explained:</strong>
          <br />
          Amortization is the process of spreading out a loan into a series of
          fixed payments. The initial payments are more towards the interest
          amount and slowly, as time goes by, a larger portion goes towards
          paying off the principal amount. An amortization schedule provides a
          detailed breakdown of each payment throughout the life of the loan.
        </p>
        <p>
          <strong>Formula Used:</strong>
          <br />
          The monthly mortgage payment is calculated using the following
          formula:
          <br />
          <img
            src={MortgageFormulaImage}
            alt="Mortgage calculation formula"
            style={{ maxWidth: "100%", display: "block", margin: "10px auto" }}
          />
          Where:
          <br />
          M = Monthly mortgage payment
          <br />
          P = Principal loan amount
          <br />
          r = Monthly interest rate (annual rate / 12)
          <br />n = Number of monthly payments (loan term in years x 12)
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
