import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { useState } from "react";
import "./LearningSection.css";
import "../Header/Header.js";
import sources from "./sources.js";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 160px;
  margin-bottom: 60px;
  padding-top: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 40px;
  gap: 20px;
`;

const SearchbarContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)({
  width: "250px",
  padding: "5px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    transform: "scale(1.05)",
  },
});

const LearningSection = () => {
  const [searchVal, setSearchVal] = useState("");

  const formattedSources = sources
    .filter((y) => {
      if (searchVal == "") {
        return y;
      } else if (y.title.toLowerCase().includes(searchVal.toLowerCase())) {
        return y;
      }
    })
    .map((x) => {
      return (
        <a href={x.link} target="_blank" rel="noopener noreferrer">
          <StyledCard classname="card">
            <div>
              <div classname="card-image">
                <img src={x.image} />
              </div>
              <div>
                <h2 classname="card-title">{x.title}</h2>
              </div>
              <div classname="card-description">
                <p>{x.description}</p>
              </div>
            </div>
          </StyledCard>
        </a>
      );
    });

  return (
    <div>
      <StyledContainer>
        <SearchbarContainer>
          <input
            type="text"
            classname="searchBar"
            placeholder="Search"
            id="searchbar"
            text-align="center"
            width="40%"
            onChange={(event) => {
              setSearchVal(event.target.value);
            }}
          />
        </SearchbarContainer>

        {formattedSources}
      </StyledContainer>
    </div>
  );
};

export default LearningSection;
