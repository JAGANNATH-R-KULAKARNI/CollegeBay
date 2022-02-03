import Paper from "@mui/material/Paper";
import * as c from "../utils/Colors";
import styles from "../styles/auth/NavBar.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Router from "next/router";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import axios from "axios";
import BadgeUI from "./Badge";
import SearchBarUI from "./SearchBar";
import { searchText } from "../utils/redux/actions";
import { useDispatch } from "react-redux";

function NavBarForAuth() {
  const router = useRouter();

  const [click, setclick] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => setclick(!click);
  const closeMenu = () => setclick(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    sessionStorage.removeItem("collegeBay");
    location.reload();
  };

  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  return (
    <div>
      <AppBar elevation={0} style={{ backgroundColor: c.c2, height: "70px" }}>
        <Paper
          style={{
            width: "100%",
            height: m1 ? "100px" : "70px",
            backgroundColor: c.c2,
            position: "fixed",
          }}
          elevation={0}
        >
          <div
            style={{
              paddingLeft: m1 ? "5%" : "10%",
              paddingRight: m1 ? "5%" : "10%",
              paddingTop: m1 ? "0%" : "1%",
              marginTop: m1 ? "-18px" : "0px",
              paddingBottom: "5%",
              color: c.c1,
              display: "flex",
              width: "100%",
            }}
          >
            <p
              style={{ fontSize: m1 ? "40px" : "20px", fontWeight: 900 }}
              className={styles.logo}
              onClick={() => {
                if (router.pathname == "/") {
                  dispatch(searchText(""));
                }
                router.push("/");
              }}
            >
              Collegebay
            </p>
            <p
              style={{
                fontSize: m1 ? "20px" : "15px",
                fontWeight: 500,
                marginLeft: m1 ? (m5 ? "67%" : "60%") : "17%",
                marginTop: m1 ? (m5 ? "3%" : "4.3%") : "8.5%",
                height: m1 ? "30px" : "25px",
              }}
              className={styles.logo}
              onClick={() => router.push("/sell")}
            >
              Sell
            </p>
            <p
              style={{
                fontSize: m1 ? "20px" : "15px",
                fontWeight: 500,
                marginLeft: m1 ? "5%" : "6%",
                marginTop: m1 ? (m5 ? "2.8%" : "3.7%") : "5.2%",
                height: m1 ? "30px" : "25px",
              }}
              onClick={() => router.push("/cart")}
            >
              {m1 ? (
                <Button
                  variant="contained"
                  endIcon={<BadgeUI />}
                  style={{
                    backgroundColor: c.c2,
                    color: c.c1,
                    height: "40px",
                    borderRadius: "20px",
                  }}
                >
                  Cart
                </Button>
              ) : (
                <BadgeUI />
              )}
            </p>
            <p
              style={{
                fontSize: m1 ? "20px" : "15px",
                fontWeight: 500,
                marginLeft: m1 ? "5%" : "6%",
                marginTop: m1 ? (m5 ? "2.8%" : "3.7%") : "5.2%",
                height: m1 ? "30px" : "25px",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    style={{ backgroundColor: c.c1 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={() => router.push("/myorders")}>
                  <Typography textAlign="center">My Orders</Typography>
                </MenuItem>
                <MenuItem onClick={logOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </p>
          </div>

          {router.pathname == "/" ? (
            <div
              style={{
                marginTop: m1 ? "-185px" : "-25px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SearchBarUI />
            </div>
          ) : null}
        </Paper>
      </AppBar>
    </div>
  );
}

export default NavBarForAuth;
