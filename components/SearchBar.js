import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import useMediaQuery from "@mui/material/useMediaQuery";
import SchoolIcon from "@mui/icons-material/School";
import * as c from "../utils/Colors";
import { searchText } from "../utils/redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function CustomizedInputBase() {
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  const dispatch = useDispatch();
  const text = useSelector((state) => state.SearchText);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: m1 ? "30%" : "100%",
      }}
      elevation={m1 ? 1 : 0}
    >
      {!m1 ? (
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon style={{ color: c.c1 }} />
        </IconButton>
      ) : null}
      <InputBase
        sx={{ ml: 1, flex: 1, color: c.c1 }}
        placeholder="Search On CollegeBay"
        inputProps={{ "aria-label": "search google maps" }}
        value={text}
        onChange={(e) => {
          dispatch(searchText(e.target.value));
        }}
      />
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <SearchIcon style={{ color: c.c1 }} />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
}
