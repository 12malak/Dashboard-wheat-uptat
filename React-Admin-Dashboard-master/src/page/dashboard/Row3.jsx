import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import Pie from "../../page/pieChart/pie";
import React from "react";
import Bar from "../../page/barChart/bar";
import Geo from "../../page/geography/geo";

const Row3 = () => {
  const theme = useTheme();
  return (
    <Stack gap={1.5} direction={"row"} flexWrap={"wrap"} mt={1.4}>
      <Paper sx={{flexGrow: 1,minWidth: "400px", width: "28%",  }}>
        <Typography
          color={theme.palette.text.secondary}
          sx={{ padding: "30px 30px 0 30px" }}
          variant="h6"
          fontWeight="600"
        >
        الادوية
        </Typography>

        <Pie isDashbord={true} />
        <Typography variant="h6" align="center" sx={{ mt: "15px" }}>
   تم عرض 330 نوع من الادويه 
        </Typography>
        <Typography variant="body2" px={0.7} pb={3} align="center">
       يشمل نسب أنواع الادويه او تصنيفاتها
        </Typography>
      </Paper>

      <Paper sx={{flexGrow: 1,minWidth: "400px", width: "33%",  }}>
      <Typography
          color={theme.palette.text.secondary}
          variant="h6"
          fontWeight="600"
          sx={{ padding: "30px 30px 0 30px" }}
        >
          كمية المبيعات
        </Typography>


<Bar isDashbord={true} />


      </Paper>

      <Paper sx={{flexGrow: 1,minWidth: "400px", width: "33%",  }}>
        

      <Geo isDashbord={true} />
      </Paper>
    </Stack>
  );
};

export default Row3;
