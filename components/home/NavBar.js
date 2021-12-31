import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Red, Blue, Purple, Yellow } from "../../utils/Colors";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import styles from "../../styles/NavBar.module.css";
import * as Colors from "../../utils/Colors";
import { useEffect } from "react";
import axios from "axios";
import BadgeUI from "./Badge";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = (props) => {
  const matches = useMediaQuery("(min-width:700px)");
  const router = useRouter();
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

  const LOGO = (
    // <Image src="/assets/home/logo.png" height="30px" width="70px" alt="logo" />
    <div></div>
  );
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        marginTop: "-17px",
        height: "85px",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                pointerEvents: "stroke",
              }}
              onClick={() => router.push("/")}
              className={styles.logo}
            >
              {matches ? LOGO : MENU}
              <h2 style={{ color: Purple, paddingLeft: "10px" }}>College</h2>
              <h2 style={{ color: Yellow }}>Bay</h2>
            </div>
          </Typography>{" "}
          <Box sx={{ flexGrow: 1 }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
          <div style={{ display: "flex" }}>
            <div
              style={{ paddingRight: "20px" }}
              onClick={() => router.push("/cart")}
            >
              {matches ? (
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
