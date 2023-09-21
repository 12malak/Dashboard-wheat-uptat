import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Select, Snackbar, Stack } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import "./Style-file.css";

function EditDrug() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drugUrl, setDrugUrl] = useState("");
  const [drugName, setDrugName] = useState("");
  const [drugDesc, setDrugDesc] = useState("");
  const [drugId, setdrugId] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/DrugTable");
  };

  const handleClick = () => {
    setOpen(true);
  };


  const fetchDrug = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getDrug/${id}`);
      const data = await response.json();
  
      console.log('Response:', response);
      console.log('Data:', data);
  
      if (data && data.drugUrl) {
        setDrugUrl(data.drugUrl);
        setDrugName(data.drugName);
        setDrugDesc(data.drugDesc);
        setdrugId(data._id);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  
  useEffect(() => {
    fetchDrug();
  }, []);
  const EditDrugDataHandler = async () => {
    if (!drugName || !drugDesc) {
      console.log('Error: drugName and drugDesc are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/updateDrug/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drugDesc: drugDesc,
          drugName: drugName,
          drugUrl: drugUrl,
        }),
      });

      if (response.ok) {
    
      } else {
        console.log('Error updating drug data:', response.status);
      }
    } catch (error) {
      console.log('Error updating drug data:', error);
    }
  };

  const onSubmit = (data) => {
    console.log("doneeeeeeeeeeee");
    handleClick();
    EditDrugDataHandler();
  };


  const onChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      getBase64(file);
    }
  };
 
  const onLoad = fileString => {
  
    setDrugUrl(fileString);
  };
  const getBase64 = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  
  
  

  return (
    <div>
      <Box dir="rtl" lang="ar">
      <Box sx={{ fontSize: "20px", fontWeight: "800" }}>
        <Header title="تعديل معلومات الدواء " subTitle="  " />
      </Box>
      <Box
       onSubmit={handleSubmit(onSubmit)}
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
       
        sx={{ flex: 1 }}
            label="     عدل اسم الدواء"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            variant="outlined"
          />

          <TextField
         
            sx={{ flex: 1 }}
            label="عدل وصف  الدواء"
            id="outlined-textarea"
            multiline
            value={drugDesc}
            onChange={(e) => setDrugDesc(e.target.value)}
            variant="outlined"
          />


        </Stack>
        <Stack sx={{ gap: 2 }} direction="row">
          
        <TextField

  sx={{ flex: 1 }}
  label="صورة عن الدواء"
  type="file"
  onChange={onChange}
  // value={drugUrl } 
  variant="outlined"
/>

        </Stack>

        <Box sx={{ textAlign: "left" }}>
          <Button
            type="submit"
            sx={{  fontSize: "20px" , fontWeight: "900" , color:"#ffffff"}}
            variant="contained"
           
          >
           تعديل
          </Button>

          <Snackbar
         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
       
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" ,fontSize: "20px",  lineHeight: "22px" }}>
          
           لقد تم تعديل الدواء  بنجاح
            </Alert>
          </Snackbar>
        </Box>
      </Box>
  
  
</Box>
    </div>
  )
}

export default EditDrug;