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

function ViewRecipes() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getConfirmation/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          throw new Error('Failed to fetch recipe data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }
  const handleGoBack = () => {
    navigate("/Recipes");
  };
  const theme = useTheme();
  return (
    <Box  dir="rtl" lang="ar" >
     <Box sx={{ fontSize: "20px" , fontWeight: "800" }}>
      
      <Header title=" تفاصيل الوصفه    " subTitle=" " />
      </Box>
    <Box sx={{ display: "flex", justifyContent: "center"}}>
    
       <Card sx={{ width: 445 , textAlign: 'center'}}>
      <CardMedia
        sx={{ height: 200 }}
        image={`http://localhost:8000/${recipe.foodUrl}`}
      
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
       اسم الوصفه : {recipe.foodName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
       سعر الوصفه : {recipe.price}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
       الكميه : {recipe.quantity}
        </Typography>
       
        <Typography variant="h6" component="div">
        وصف عن الوصفه : {recipe.foodDesc} 
        </Typography>
        <Typography gutterBottom variant="h6" color="text.secondary">
         إسم الشيف : {recipe.name} 
        </Typography>
        <Typography gutterBottom variant="h6" color="text.secondary">
       رقم الموبايل : {recipe.phone}
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
  );
}

export default ViewRecipes;
{/* <h3>Recipe Details</h3>
<h3>{recipe.name}</h3> 
<h3>  {recipe.phone}</h3>
<h3>  {recipe.foodDesc}</h3>
<h3>  {recipe.foodName}</h3>
<h3>  {recipe.foodUrl}</h3>

<h3>  {recipe.price}</h3>

<h3>  {recipe.quantity}</h3> */}