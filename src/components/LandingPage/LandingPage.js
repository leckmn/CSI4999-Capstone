// src/components/LandingPage.js
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CalculatorCard from "../Calculators/CalculatorCard";
import { Grid } from "@mui/material";
import "./LandingPage.css";

import learningImage from "../../images/LearningImage.jpg";
import mortgageCalculatorPicture from "../../images/MortgageCalculator.png";
import rentvsBuyCalculatorImage from "../../images/RentVsBuy.png";
import debtToIncomeCalcImage from "../../images/DebtToIncome.png";
import affordabilityCalcImage from "../../images/AffordabilityCalc.png";

const LandingPage = () => (
  <>
    <div className="landing-page-content">
      <Grid
        container
        spacing={3}
        style={{ padding: "20px", paddingTop: "100px" }}
      >
        <Grid item xs={12} sm={6}>
          <CalculatorCard
            title="Mortgage Calculator"
            image={mortgageCalculatorPicture}
            description="Calculate your mortgage payments"
            route="/mortgage-calculator"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalculatorCard
            title="Debt to Income Calculator"
            image={debtToIncomeCalcImage}
            description="Assess your financial health"
            route="/debt-to-income-calculator"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalculatorCard
            title="Rent vs Buy Calculator"
            image={rentvsBuyCalculatorImage}
            description="Compare the cost of renting vs buying"
            route="/rent-vs-buy-calculator"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalculatorCard
            title="Home Affordability Calculator"
            image={affordabilityCalcImage}
            description="Determine how much house you can afford"
            route="/home-affordability-calculator"
          />
        </Grid>
        <Grid item xs={12}>
          <CalculatorCard
            title="Learning Section"
            image={learningImage}
            description="Educate yourself about personal finance"
            route="/learning-section"
          />
        </Grid>
      </Grid>
    </div>
    <Footer />
  </>
);

export default LandingPage;
