// src/components/Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import MortgageCalculator from "../components/Calculators/MortgageCalculator/MortgageCalculator";
import DebtToIncomeCalculator from "../components/Calculators/DebtToIncomeCalculator/DebtToIncomeCalculator";
import RentVsBuyCalculator from "../components/Calculators/RentVsBuyCalculator/RentVsBuyCalculator";
import HomeAffordabilityCalculator from "../components/Calculators/HomeAffordabilityCalculator/HomeAffordabilityCalculator";
import LearningSection from "../components/LearningSection/LearningSection";

const RoutesComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
      <Route
        path="/debt-to-income-calculator"
        element={<DebtToIncomeCalculator />}
      />
      <Route path="/rent-vs-buy-calculator" element={<RentVsBuyCalculator />} />
      <Route
        path="/home-affordability-calculator"
        element={<HomeAffordabilityCalculator />}
      />
      <Route path="/learning-section" element={<LearningSection />} />
    </Routes>
  </Router>
);

export default RoutesComponent;
