// src/components/CalculatorCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  borderRadius: "15px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    transform: "scale(1.05)",
  },
});

const CalculatorCard = ({ title, image, description, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  // Determine icon based on title
  let icon;
  switch (title) {
    case "Mortgage Calculator":
      icon = "account_balance";
      break;
    case "Debt to Income Calculator":
      icon = "money_off_csred";
      break;
    case "Rent vs Buy Calculator":
      icon = "compare";
      break;
    case "Home Affordability Calculator":
      icon = "home";
      break;
    case "Learning Section":
      icon = "school";
      break;
    default:
      icon = "error_outline";
  }

  return (
    <StyledCard onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={`${title} icon`}
          height="140"
          image={image}
          title={title}
          style={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <span
              className="material-icons"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            >
              {icon}
            </span>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default CalculatorCard;
