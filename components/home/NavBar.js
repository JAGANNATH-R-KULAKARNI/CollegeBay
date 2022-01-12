import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Router from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { Red, Blue, Purple, Yellow } from "../../utils/Colors";
import Image from "next/image";
import styles from "../../styles/NavBar.module.css";
import * as Colors from "../../utils/Colors";
import axios from "axios";
import BadgeUI from "./Badge";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
function Navbar() {
  const bg1 = useMediaQuery("(min-width:700px)");
  const router = useRouter();

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  const [click, setclick] = useState(false);

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
  const MENU = (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="warning"
        style={{ color: "black" }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <Link href="/">
            <Tooltip title="Hi there">
              <div
                className={styles.navbar_logo}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  pointerEvents: "stroke",
                }}
              >
                {/* {bg1 ? null : MENU} */}
                <h1
                  style={{
                    color: Purple,
                    paddingLeft: "20px",
                    fontSize: "30px",
                  }}
                >
                  College
                </h1>
                <h1 style={{ color: Yellow, fontSize: "30px" }}>bay</h1>
              </div>
            </Tooltip>
          </Link>

          <ul
            className={
              click
                ? styles.nav_menu_hidden + " " + styles.active
                : styles.nav_menu_hidden
            }
          >
            <li className={styles.nav_item} onClick={closeMenu}>
              <Button
                className={styles.btn}
                style={{
                  backgroundColor: Colors.Yellow,
                }}
              >
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  Shop
                </a>
              </Button>
            </li>
            <li className={styles.nav_item} onClick={closeMenu}>
              <Button
                className={styles.btn}
                style={{
                  backgroundColor: Colors.Yellow,
                }}
              >
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  Cakes
                </a>
              </Button>
            </li>
            <li className={styles.nav_item} onClick={closeMenu}>
              <Button
                className={styles.btn}
                style={{
                  backgroundColor: Colors.Yellow,
                }}
              >
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  Rooms
                </a>
              </Button>
            </li>
            <li className={styles.nav_item} onClick={closeMenu}>
              <Button
                className={styles.btn + " " + styles.btn_glow}
                style={{ backgroundColor: Colors.Purple, color: "white" }}
                onClick={() => router.push("/sell")}
              >
                Sell
              </Button>
            </li>
          </ul>
          {/*
          <ul>
            {bg1 ? null : (
              <li>
                <Button
                  className={styles.btn}
                  style={{
                    height: "40px",
                    width: "130px",
                    backgroundColor: "#FFCC00",
                    fontSize: "13px",
                  }}
                >
                  <Link
                    href="/#bookNow"
                    style={{
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    Live Classes
                  </Link>
                </Button>
              </li>
            )}
          </ul> */}
          <ul
            className={styles.nav_menu}
            style={{ marginRight: bg1 ? "15px" : "-15px" }}
          >
            {/* {profile ? (
              <ProfileIconUI
                type="Logout"
                Afterclick={signOut}
                user={userDetail.username}
                Image={Image}
              />
            ) : (
              <li className={styles.nav_item}>
                <div className={styles.nav_links} onClick={checkUser}>
                  LOGIN
                </div>
              </li>
            )} */}
            <div
              style={{ paddingRight: "20px" }}
              onClick={() => router.push("/cart")}
            >
              {bg1 ? (
                <Button
                  variant="contained"
                  endIcon={<BadgeUI />}
                  style={{
                    backgroundColor: Colors.Yellow,
                    height: "40px",
                    borderRadius: "20px",
                  }}
                >
                  Cart
                </Button>
              ) : (
                <BadgeUI />
              )}
            </div>
            <div style={{ float: "right" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
            </div>
          </ul>
          <div className={styles.menu_icon} onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
