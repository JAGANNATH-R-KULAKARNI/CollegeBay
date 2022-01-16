import React from "react";
import Paper from "@mui/material/Paper";
import * as c from "../../utils/Colors";
import styles from "../../styles/auth/NavBar.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function NavBarForAuth() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  return (
    <div>
      <Paper
        style={{
          width: "100%",
          height: m1 ? "150px" : "90px",
          backgroundColor: c.c2,
          position: "fixed",
        }}
        elevation={0}
      >
        <div
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            paddingTop: "1%",
            paddingBottom: "5%",
            color: c.c1,
            display: "flex",
            width: "100%",
          }}
        >
          <p
            style={{ fontSize: m1 ? "40px" : "30px", fontWeight: 900 }}
            className={styles.logo}
            onClick={() => router.push("/")}
          >
            Collegebay
          </p>

          <p
            style={{
              fontSize: m1 ? "20px" : "15px",
              fontWeight: 500,
              marginLeft: m1 ? "70%" : "20%",
              marginTop: m1 ? "4.2%" : "12.3%",
              height: m1 ? "30px" : "25px",
            }}
            className={styles.logo}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            About Me
          </p>
        </div>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          style={{
            fontSize: "10px",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            Myself Jagannath R Kulakarni. I am a coder
          </Typography>
        </Popover>
      </Paper>
    </div>
  );
}

export default NavBarForAuth;
