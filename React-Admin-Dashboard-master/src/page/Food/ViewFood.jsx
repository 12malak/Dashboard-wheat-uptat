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

function ViewFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [foodObj, setFoodObj] = useState({});

  const fetchViewFood = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getFood/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFoodObj(data);
      } else {
        throw new Error('Failed to fetch Food data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchViewFood();
  }, [id]);

  if (!foodObj) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate("/FoodTable");
  };

  const theme = useTheme();

  return (
    <Box dir="rtl" lang="ar">
      <Box sx={{ fontSize: "20px", fontWeight: "800" }}>
        <Header title=" تفاصيل الوصفه " subTitle=" " />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 445, textAlign: 'center' }}>
          <CardMedia
            sx={{ height: 350 }}
            // @ts-ignore
            image={foodObj.foodUrl}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              اسم الوصفه : {foodObj.
// @ts-ignore
              foodName}
            </Typography>
            <Typography variant="h6" component="div">
              وصف عن الوصفه : {foodObj.
// @ts-ignore
              foodDesc}
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
  );
}

export default ViewFood;