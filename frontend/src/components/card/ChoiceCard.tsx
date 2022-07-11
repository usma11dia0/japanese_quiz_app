import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { brown } from "@mui/material/colors";

import { CARDPROPS } from "../../types/components";

export const ChoiceCard: FC<CARDPROPS> = (props) => {
  const { children, customSx, imgSrc } = props;
  return (
    <Card sx={customSx} elevation={12}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={imgSrc}
          alt="choice image"
          sx={{
            padding: "30px",
            outline: "3px dashed #a1887f",
            outlineOffset: "-30px",
          }}
        />
        <CardContent sx={{ color: "white", backgroundColor: brown[400] }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
            fontWeight="bold"
          >
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
