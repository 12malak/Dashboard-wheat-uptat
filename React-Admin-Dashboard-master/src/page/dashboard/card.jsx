import React from "react";
import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const Card = ({ icon, title, subTitle, increase, data, scheme}) => {

  const theme = useTheme();
  return (
    <Paper
      sx={{
        flexGrow: 1,
        minWidth: "333px",
        p: 1.5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Stack gap={1}>
      
        <Typography variant="body2" sx={{ fontSize: "18px" , fontWeight:"600"}}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "15px" , fontWeight:"600"}}>
          {subTitle}
        </Typography>
      </Stack>

      <Stack >
        <Box height={"70px"} width={"57px"}>
        {icon}
        </Box>
     
      </Stack>
    </Paper>
  );
};

export default Card;
