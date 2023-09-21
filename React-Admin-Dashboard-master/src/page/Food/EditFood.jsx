import React, { useState ,useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from "../../components/Header";

function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodUrl, setFoodUrl] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [FoodId, setFoodId] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
    navigate("/FoodTable");
  };
    
  const handleClick = () => {
    setOpen(true);
  };
  const fetchFood = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getFood/${id}`);
      const data = await response.json();
  
      console.log('Response:', response);
      console.log('Data:', data);
  
      if (data && data.foodUrl) {
        setFoodUrl(data.foodUrl);
        setFoodName(data.foodName);
        setFoodDesc(data.foodDesc);
        setFoodId(data._id);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  
  useEffect(() => {
    fetchFood();
  }, []);
  const onSubmit = () => {
    console.log("doneeeeeeeeeeee");
    handleClick();
    editFoodDataHandler();
  };

  const editFoodDataHandler = async () => {
    if (!foodName || !foodDesc) {
      console.log('Error: foodName and foodDesc are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/updateFood/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodDesc: foodDesc,
          foodName: foodName,
          foodUrl: foodUrl,
        }),
      });

      if (response.ok) {
        // handle successful response
      } else {
        console.log('Error updating Food data:', response.status);
      }
    } catch (error) {
      console.log('Error updating Food data:', error);
    }
  };

  const onChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      getBase64(file);
    }
  };
  
  const onLoad = (fileString) => {
    setFoodUrl(fileString);
  };
  
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  return (
    <Box dir="rtl" lang="ar">
      <Box sx={{ fontSize: "20px", fontWeight: "800" }}>
        <Header title="تعديل الطعام" subTitle="" />
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack sx={{ gap: 2 }} direction={"row"}>
          <TextField
          
            sx={{ flex: 1 }}
            label="عدل اسم الطعام"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            variant="outlined"
          />

          <TextField
           
            sx={{ flex: 1 }}
            label="عدل وصف الطعام"
            id="outlined-textarea"
            multiline
            value={foodDesc}
            onChange={(e) => setFoodDesc(e.target.value)}
            variant="outlined"
          />
        </Stack>
        <Stack sx={{ gap: 1 }} direction={"row"}>
          <TextField
          
            sx={{ flex: 1 }}
            label="صورة الطعام"
            variant="outlined"
            type="file"
            onChange={onChange}
          />
        </Stack>

        <Box sx={{ textAlign: "left" }}>
          <Button
            type="submit"
            sx={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            تعديل الطعام
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="warning" sx={{ width: "100%", fontSize: "20px", lineHeight: "22px" }}>
              لقد تم تعديل الطعام بنجاح
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
}

export default EditFood;