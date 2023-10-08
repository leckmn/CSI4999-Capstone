// src/components/Header.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./Header.css";

const Header = () => (
  <AppBar
    position="fixed"
    style={{ backgroundColor: "#2c3e50", fontFamily: "Arial" }}
  >
    <Toolbar className="header-toolbar">
      <Typography variant="h6" component="h1" fullWidth>
        Financial Calculators
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
