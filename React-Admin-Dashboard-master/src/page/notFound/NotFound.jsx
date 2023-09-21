import React from "react";
import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/material";

const NotFound = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography align="center" color={theme.palette.error.main} variant="h5">
      لا يوجد تصميم حتى الآن
      <br />
      <br />
     ...  يُرجى المحاولة مرة أخرى لاحقًا
      </Typography>
    </Box>
  );
};

export default NotFound;