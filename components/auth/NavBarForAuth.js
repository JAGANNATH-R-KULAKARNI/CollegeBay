import React from "react";
import Paper from "@mui/material/Paper";
import * as c from "../../utils/Colors";
import styles from "../../styles/auth/NavBar.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";

function NavBarForAuth() {
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
          >
            Collegebay
          </p>
          <p
            style={{
              fontSize: m1 ? "20px" : "15px",
              fontWeight: 500,
              marginLeft: m1 ? "70%" : "20%",
              marginTop: m1 ? "4.2%" : "15.5%",
              height: m1 ? "30px" : "25px",
            }}
            className={styles.logo}
          >
            About Me
          </p>
        </div>
      </Paper>
    </div>
  );
}

export default NavBarForAuth;
