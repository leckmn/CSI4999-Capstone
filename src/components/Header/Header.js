// src/components/Header.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../images/Logo.png";
import "./Header.css";

const Header = () => (
  <AppBar
    position="fixed"
    style={{
      backgroundColor: "#2c3e50",
      fontFamily: "Arial",
    }}
  >
    <Toolbar className="header-toolbar">
      <img src={logo} alt="Your Logo" className="logo" />
      <div>
        <Typography variant="h5" component="h1" className="title">
          Empower Your Finances
        </Typography>
        <Typography variant="subtitle1" className="subtitle">
          Accurate tools for smart financial decisions
        </Typography>
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;
