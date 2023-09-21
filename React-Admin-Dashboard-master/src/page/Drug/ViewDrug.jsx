import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Header from "../../components/Header";

import { Box, Typography, useTheme } from "@mui/material";
import { Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { Palette } from '@mui/icons-material';

function ViewDrug() {

    const { id } = useParams();
  const navigate = useNavigate();

  const [drugData, setdrugData] = useState([]);

  const fetchViewDrug = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getDrug/${id}`);
      if (response.ok) {
        const data = await response.json();
        setdrugData(data);
      } else {
        throw new Error('Failed to fetch drug Data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchViewDrug();
  }, [id]);

  if (!drugData) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate("/DrugTable");
  };

  const theme = useTheme();
  


  return (
    <Box dir="rtl" lang="ar">
      <Box sx={{ fontSize: "20px", fontWeight: "800" }}>
        <Header title=" تفاصيل الدواء " subTitle=" " />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 445, textAlign: 'center' }}>
          <CardMedia
            sx={{ height: 400 }}
            // @ts-ignore
            image={drugData.drugUrl}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              اسم الدواء : {drugData.
// @ts-ignore
drugName}
            </Typography>
            <Typography variant="h6" component="div">
              وصف عن الدواء : {drugData.
// @ts-ignore
drugDesc}
            </Typography>


          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              sx={{ color: theme.palette.text.secondary }}
              onClick={handleGoBack}
            >
              رجوع
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default ViewDrug
