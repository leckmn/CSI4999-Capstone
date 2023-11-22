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
          <strong>Understanding the Rent Vs Buy Calculator:</strong>
          <br />
          This calculator helps you predict at which point you should change your 
          home ownership strategy from renting a home to buying a home. The inputs are:
          <ul>
            <strong>Rent Information:</strong>
              <ul>
                <li>
                  <strong>Monthly Rent:</strong> Total price of rent due each month.
                </li>
                <li>
                  <strong>Security Deposit:</strong> Total value of the security deposit paid.
                </li>
                <li>
                  <strong>Annual Rent Increase:</strong> Estimated percent increase of the rent at the end of each year.
                </li>
              </ul>
            <strong>Home Information:</strong>
              <ul>
                <li>
                  <strong>Home Price:</strong> Total price of the home you're
                  purchasing.
                </li>
                <li>
                  <strong>Down Payment:</strong> Upfront amount you're paying,
                  typically expressed as a percentage of the home price.
                </li>
                <li>
                  <strong>Mortgage Term:</strong> Number of years you have to repay
                  the loan (e.g., 30 years).
                </li>
                <li>
                  <strong>Mortgage Interest Rate:</strong> Annual interest rate of the
                  loan.
                </li>
                <li>
                  <strong>Annual Home Maintenance and Repairs:</strong> Estimated cost of typical
                  maintenance and repair costs per year.
                </li>
                <li>
                  <strong>Property Tax:</strong> Monthly property tax amount.
                </li>
                <li>
                  <strong>Appreciation Rate:</strong> Estimated percentage at which the value of 
                  the home increases per year.
                </li>
              </ul>
          </ul>
        </p>
        <p>
          <strong>Calculation Explained:</strong>
          <br />
          There are 2 calculations performed by this calculator. 
          <ul>
            <strong>Total Rent Cost: </strong>
            The first calculation is the total rent paid at the end of each year. This calculation starts 
            initially with your security deposit as that is the only amount paid at the begining. Then 
            after every year the total annaual rent is added to this amount to give you how much you 
            have spent on rent for that given amount of time.
          </ul>
          <ul>
            <strong>Total Home Cost: </strong>
            The second calculation is the total amount of the mortgage that has been paid. This calculation 
            initially starts with your down payment then adds to that total each year given your monthly 
            mortgage payment. The calculator also takes into account the appreciation value of the house 
            by deducting it from the total cost of the house that has been paid.
          </ul>
        </p>
        <p>
          <strong>Graph Explained:</strong>
          <br />
          The graph shows two lines - one representing the total annual rent paid over the life of the mortgage
          and another line showing the total amount of money paid towards the mortgage over the same period.
          These two lines intersect when the total amount of money paid equals the total annual rent paid.
          This intersection point tells you when you should change from renting to buying. Typically renting 
          is cheaper in the first several years due to the down payment of a home, but becomes more expensive 
          overtime due to the appreciation of the home  
        </p>
        
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
