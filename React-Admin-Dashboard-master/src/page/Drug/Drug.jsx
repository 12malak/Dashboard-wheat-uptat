import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Select, Snackbar, Stack } from "@mui/material";
// @ts-ignore
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "./Style-file.css" ;
function Drug() {
  const [image, setImage] = useState('')
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef("");
  const { register, handleSubmit, formState: { errors } } = useForm();
const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  
  const handleClose = () => {
    setOpen(false);
    // window.location.href = "http://localhost:5173/";
  navigate("/DrugTable");

  };

  const handleClick = () => {
    setOpen(true);
   
  };

  const onSubmit = ( ) => {
  
    console.log("doneeeeeeeeeeee");
    handleClick();
    getDrugDataHandler();
 

  };

  const getDrugDataHandler = () => {
    const newDrugObj = {
      drugName: inputRef1.current.value,
    
      drugDesc: inputRef2.current.value,
      drugUrl: inputRef3.current,
    };
    console.log(newDrugObj);

    fetch("http://localhost:8000/adminDrug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDrugObj),
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
    inputRef3.current = fileString;
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
        <Header title="إضافة دواء جديد" subTitle="  " />
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
        <Stack sx={{ gap: 2 }} direction="row">
          <TextField
            error={Boolean(errors.rugName)}
            helperText={
              Boolean(errors.rugName)
              ? "     هذا حقل العنوان مطلوب ولا يقل عن 3 أحروف ولا يزيد عن 20 حرف"
                : null
            }
            {...register("invalidName", { required: true, minLength: 3, maxLength: 20 })}
            sx={{ flex: 1 }}
            label="اسم الدواء"
            inputRef={inputRef1}
            variant="outlined"
          />

          <TextField
            error={Boolean(errors.rugDesc)}
            helperText={
              Boolean(errors.rugDesc)
                ? "هذا الحقل مطلوب والحد الأدنى 3 أحرف"
                : null
            }
            {...register("rugDesc", { required: true, minLength: 3 })}
            sx={{ flex: 1 }}
            label="وصف عن الدواء"
            id="outlined-textarea"
            multiline
            inputRef={inputRef2}
            variant="outlined"
          />
        </Stack>
        <Stack sx={{ gap: 2 }} direction="row">
          
  

          <TextField
            error={Boolean(errors.invalidimag)}
            helperText={
              Boolean(errors.invalidimag)
                ? "هذا الحقل مطلوب والحد الأدنى 3 أحرف"
                : null
            }
            {...register("invalidimag", { required: true, minLength: 3 })}
          
            sx={{ flex: 1}}
            label="صورة عن الدواء"
            type="file"
                onChange={(event) => onChange(event)}
            variant="outlined"
         
            
          
          />
        </Stack>

        <Box sx={{ textAlign: "left" }}>
          <Button
            type="submit"
            sx={{  fontSize: "20px" , fontWeight: "900" , color:"#ffffff"}}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            إضافة دواء
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


export default Drug
