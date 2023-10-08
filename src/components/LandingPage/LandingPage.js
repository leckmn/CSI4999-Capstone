// src/components/LandingPage.js
import React from "react";
import Header from "../Header/Header";
import CalculatorCard from "../Calculators/CalculatorCard";
import { Grid } from "@mui/material";

import homeAffordabilityCalcImage from "../../images/homeAffordabilityCalc.jpg";
import debtToIncomeImage from "../../images/DebtToIncome.jpg";
import mortgageCalcImage from "../../images/mortgageCalculator.jpg";
import rentVsBuyImage from "../../images/RentVsBuy.jpg";
import learningImage from "../../images/LearningImage.jpg";

const LandingPage = () => (
  <div>
    <Header />
    <Grid
      container
      spacing={3}
      style={{ padding: "20px", paddingTop: "100px" }}
    >
      <Grid item xs={12} sm={6}>
        <CalculatorCard
          title="Mortgage Calculator"
          image={mortgageCalcImage}
          description="Calculate your mortgage payments"
          route="/mortgage-calculator"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CalculatorCard
          title="Debt to Income Calculator"
          image={debtToIncomeImage}
          description="Assess your financial health"
          route="/debt-to-income-calculator"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CalculatorCard
          title="Rent vs Buy Calculator"
          image={rentVsBuyImage}
          description="Compare the cost of renting vs buying"
          route="/rent-vs-buy-calculator"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CalculatorCard
          title="Home Affordability Calculator"
          image={homeAffordabilityCalcImage}
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
);

export default LandingPage;
