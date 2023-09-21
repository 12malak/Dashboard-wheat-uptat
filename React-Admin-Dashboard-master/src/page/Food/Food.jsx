import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
// @ts-ignore
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";




function Food() {
  const inputRef1food = useRef(null);
  const inputRef2food = useRef(null);
  const inputRef3food = useRef("");
  const [foodObj, setFoodObj] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = () => {
    setOpen(false);
    navigate("/FoodTable");
  };
    
      const handleClick = () => {
        setOpen(true);
      };
    

      const onSubmit = ( ) => {
   
        console.log("doneeeeeeeeeeee");
      
        handleClick();
        getFoodDataHandler();
      };

     
      const getFoodDataHandler = () => {
        const foodData = {
          foodName: inputRef1food.current.value,
          foodDesc: inputRef2food.current.value,
          foodUrl: inputRef3food.current,
        };
      
        fetch("http://localhost:8000/adminFood", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foodData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    

    const onChange = (e) => {
      const files = e.target.files;
      const file = files[0];
      getBase64(file);
    };
    
    const onLoad = (fileString) => {
      inputRef3food.current = fileString;
    };
    
    const getBase64 = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onLoad(reader.result);
      };
    };
  
  
  
      return (
    
    
    
    
    <Box  dir="rtl" lang="ar">
         <Box sx={{ fontSize: "20px" , fontWeight: "800" }}>
      
          <Header title="إضافه أطعمه   " subTitle=" " />
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
                error={Boolean(errors.invalidName)}
                helperText={
                  Boolean(errors.invalidName)
                    ? "     هذا حقل العنوان مطلوب ولا يقل عن 3 أحروف ولا يزيد عن 20 حرف"
                    : null
                }
                {...register("invalidName", { required: true, minLength: 3, maxLength: 20 })}
                sx={{ flex: 1  }}
                label="اسم الطعام"
                variant="outlined"
                inputRef={inputRef1food}
              />
      
              <TextField
                error={Boolean(errors.invalidDesc)}
                helperText={
                  Boolean(errors.invalidDesc)
                    ? "هذا الحقل مطلوب ولا يقل عن 3 أحرف"
                    : null
                }
                {...register("invalidDesc", { required: true, minLength: 3 })}
                sx={{ flex: 1 }}
                label="وصف عن الطعام"
                id="outlined-textarea"
                multiline
                inputRef={inputRef2food}
                variant="outlined"
              />
            </Stack>
            <Stack sx={{ gap: 1 }} direction={"row"}>
              <TextField
                error={Boolean(errors.invalidimag)}
                helperText={
                  Boolean(errors.invalidimag)
                    ? "هذا الحقل مطلوب ولا يقل عن 3 أحرف"
                    : null
                }
                {...register("invalidimag", { required: true, minLength: 3 })}
                sx={{ flex: 1}}
                label="صوره عن الطعام"
                variant="outlined"
                type="file"
                onChange={(event) => onChange(event)}
              />
      
            
            </Stack>
{/*           
            <TextField label="Adress 1" variant="outlined" />
            <TextField label="Adress 2" variant="outlined" />
       */}
      
            <Box sx={{ textAlign: "left"  }}>
              <Button
                type="submit"
                sx={{  fontSize: "20px" , fontWeight: "800" , color:"#ffffff"}}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                إضافه طعام
              </Button>
      
             
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
       
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" ,fontSize: "20px",  lineHeight: "22px" }}>
           لقد تم إضافه دواء جديد بنجاح
            </Alert>
          </Snackbar>
            </Box>
          </Box>
      
      
    </Box>
    
    
    
    );
    };

export default Food
