import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import * as Colors from "../../utils/Colors";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CustomizedBadges(props) {
  const cartLen = useSelector((state) => state.changeCartLen);
  return (
    <IconButton aria-label="cart">
      <StyledBadge
        badgeContent={cartLen}
        // color="primary"
        style={{ color: "white" }}
      >
        <ShoppingCartIcon style={{ color: "white" }} />
      </StyledBadge>
    </IconButton>
  );
}
