import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Colors from "../../utils/Colors";
import Link from "next/link";

export default function MediaControlCard({ data, deleteCartItem }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        width: "90%",
        justifyContent: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "70%",
          minWidth: "70%",
          float: "left",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            <Link href={`/product/${data.route}`}>
              <a style={{ color: Colors.Purple }}> {data && data.name}</a>
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {data && data.category}
          </Typography>

          <h2>₹ {data && data.price}</h2>
          <Button
            size="small"
            variant="outlined"
            style={{ backgroundColor: Colors.Yellow, color: "white" }}
            onClick={() => deleteCartItem(data.route)}
          >
            Remove From Cart
          </Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, maxWidth: "30%", float: "right", right: 0 }}
        image={data.image}
        alt="Live from space album cover"
      />
    </Card>
  );
}
