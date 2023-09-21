

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import React, { useState, useRef } from "react";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const todayAtNoon = dayjs().set('hour', 12).startOf('hour');
const todayAt3PM = dayjs().set('hour', 15).startOf('hour');
import { useLocation, useNavigate } from "react-router-dom";
function AddEvent() {
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const [eventObj, setEventObj] = useState({});
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/EventTable");
  };

  const handleClick = () => {
    setOpen(true);
   
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log("doneeeeeeeeeeee");
    handleClick();
    getEventDataHandler();
 

  };


  const getEventDataHandler = () => {
    const newEventObj = {
      eventTitle: inputRef4.current.value,
      eventDesc: inputRef5.current.value,
      eventDate:inputRef6.current.value,
    };
    setEventObj(newEventObj);
    console.log(newEventObj);

    ///////
    fetch("http://localhost:8000/adminEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEventObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    ///////
  };

  return (




<Box  dir="rtl" lang="ar">
     <Box >
  
      <Header title=" إضافه ورشه او ندوه   " subTitle="" />
      </Box>
      <Box
      
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      
        autoComplete="off"
      >
        <Stack sx={{ gap: 2 }} direction={"row"}>
         <TextField
            error={Boolean(errors.rugName)}
            helperText={
              Boolean(errors.rugName)
                ? "هذا الحقل مطلوب والحد الأدنى 3 أحرف"
                : null
            }
            {...register("rugName", { required: true, minLength: 3 })}
            inputRef={inputRef4}
          
            sx={{   flex: 1}}
            label=" عنوان للورشه"
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
            inputRef={inputRef5}
            sx={{ flex: 1 }}
            id="outlined-textarea"
            multiline
            label="وصف عن الورشه"
            variant="outlined"
          />
        </Stack>
   
{/*           
        <TextField label="Adress 1" variant="outlined" />
        <TextField label="Adress 2" variant="outlined" />
   */}

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker 
         value={eventDate}
              onChange={(newDate) => setEventDate(newDate)}
         
                 
              
                   />
      </DemoContainer>
    </LocalizationProvider> */}
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField defaultValue={tomorrow} disableFuture />
    </LocalizationProvider>
   */}





   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DemoItem  

        // @ts-ignore
     label="اذا لم تحدد تايخ لبدء الورشه سيعتمد تاريخ اليوم" >
          <DateTimePicker defaultValue={todayAtNoon} minDateTime={todayAt3PM}  inputRef={inputRef6} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
        
        <Box sx={{ textAlign: "left"  }}>
          <Button
            type="submit"
            sx={{  fontSize: "20px" , fontWeight: "900" , color:"#ffffff"}}  
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
             إضافه ندوه 
          </Button>
          <Snackbar
             anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
       
            autoHideDuration={4000}
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


export default AddEvent
