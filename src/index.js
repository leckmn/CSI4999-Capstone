import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/Routes";
import Header from "./components/Header/Header";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
