import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Header from "../../components/Header";

import { Box, Typography, useTheme } from "@mui/material";
import { Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { Palette } from '@mui/icons-material';

function ViewContent() {

  const { id } = useParams();
  const [ContentData, setContentData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/ViewContact/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContentData(data);
        } else {
          throw new Error('Failed to fetch recipe data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchContent();
  }, [id]);
  if (!ContentData) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate("/Orders");
  };
  const theme = useTheme();
  
  return (
    <>
     <Box  dir="rtl" lang="ar" >
     <Box sx={{ fontSize: "20px" , fontWeight: "800" }}>
      
      <Header title=" تفاصيل مسجات التواصل    " subTitle=" " />
      </Box>
    <Box sx={{ display: "flex", justifyContent: "center"}}>
    
       <Card sx={{ width: 445 , textAlign: 'center'}}>
    
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
       الاسم  : {ContentData.
// @ts-ignore
patientName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
       البريد الالكتروني  : {ContentData.
// @ts-ignore
patientGmail}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
       رقم الموبايل: {ContentData.
// @ts-ignore
phoneNumber}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
      الرساله النصية: {ContentData.
// @ts-ignore
patientMsg}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button variant="outlined" 
         color="primary"
          size="medium"
          sx={{  color:theme.palette.text.secondary}}
           onClick={handleGoBack}>رجوع</Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
    </Box>
    </Box>
    </>
  );
}

export default ViewContent;