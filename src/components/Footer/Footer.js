import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./Footer.css";

const Footer = () => (
  <AppBar
    position="static"
    style={{
      backgroundColor: "#2c3e50",
      fontFamily: "Arial",
      marginTop: "auto",
    }}
  >
    <Toolbar className="footer-toolbar">
      <Typography variant="subtitle1" className="footer-text">
        CSI4999 - Capstone Project
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Footer;
