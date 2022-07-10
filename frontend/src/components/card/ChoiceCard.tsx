import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { brown } from "@mui/material/colors";

import { CARDPROPS } from "../../types/components";

export const ChoiceCard: FC<CARDPROPS> = (props) => {
  const { children, customSx } = props;
  return (
    <Card sx={customSx}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="/assets/background/vecteezy_asanoha-japanese-traditional-seamless-pattern-with-modern_7169479.jpg"
          alt="choice image"
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
