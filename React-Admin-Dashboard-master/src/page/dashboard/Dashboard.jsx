import React from "react";
import Row1 from "./Row1";
import Recipes from "../Recipes/Recipes";


import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  const theme = useTheme();
  return (
    <div>
<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} dir="rtl" lang="ar">
        <Header
          isDashboard={true}
          title={"لوحة التحكم"}
          subTitle={""}
        />
  
        {/* <Box sx={{ textAlign: "right", mb: 1.3 }}>
          <Button
            sx={{ padding: "6px 8px", textTransform: "capitalize" , background: theme.palette.text.secondary , color: theme.palette.background.default }}
            variant="contained"
           
          >
            <DownloadOutlined />
           تنزيل تقرير
          </Button>
        </Box> */}
</Stack>

      <Row1 />
      {/* <Row2 /> */}
      <Recipes/>
   
    </div>
  );
};

export default Dashboard;
