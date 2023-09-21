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

function ViweEvent() {
  const { id } = useParams();
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getEvents/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEventData(data);
        } else {
          throw new Error('Failed to fetch recipe data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);
  if (!eventData) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate("/EventTable");
  };
  const theme = useTheme();
  return (
    <Box  dir="rtl" lang="ar" >
     <Box sx={{ fontSize: "20px" , fontWeight: "800" }}>
      
      <Header title=" تفاصيل الندوة    " subTitle=" " />
      </Box>
    <Box sx={{ display: "flex", justifyContent: "center"}}>
    
       <Card sx={{ width: 445 , textAlign: 'center'}}>
    
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
       اسم الندوة : {eventData.
// @ts-ignore
       eventTitle}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
      تاريخ الندوة: {eventData.
// @ts-ignore
      eventDate}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        وصف عن الندوة : {eventData.
// @ts-ignore
        eventDesc}
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
  )
}

export default ViweEvent
