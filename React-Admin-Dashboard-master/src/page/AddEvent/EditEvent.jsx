
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm   } from "react-hook-form";
import Header from "../../components/Header";


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import dayjs from 'dayjs';
const todayAtNoon = dayjs().set('hour', 12).startOf('hour');
const todayAt3PM = dayjs().set('hour', 15).startOf('hour');

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Eventdate, setEventdate] = useState(dayjs());
  const [EventName, setEventName] = useState("");
  const [EventDesc, setEventDesc] = useState("");
  const [drugId, setEventId] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  console.log('Eventdate:', Eventdate);
  const handleClose = () => {
    setOpen(false);
    navigate("/EventTable");
  };

  const handleClick = () => {
    setOpen(true);
  };


  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getEvents/${id}`);
      const data = await response.json();
  
      console.log('Response:', response);
      console.log('Data:', data);
  setEventdate(dayjs(data.eventDate));
      setEventName(data.EventName);
      setEventDesc(data.EventDesc); 
      setEventId(data._id);
    
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  
  useEffect(() => {
    fetchEvent();
  }, []);

  const EditEventdateHandler = async () => {
    if (!EventName || !EventDesc) {
      console.log('Error: drugName and drugDesc are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/updateEvent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EventDesc: EventDesc,
          EventName: EventName,
          Eventdate: Eventdate.format(),
        }),
      });

      if (response.ok) {
    
      } else {
        console.log('Error updating Event date:', response.status);
      }
    } catch (error) {
      console.log('Error updating Event date:', error);
    }
  };

  const onSubmit = (data) => {
    console.log("doneeeeeeeeeeee");
    handleClick();
    EditEventdateHandler();
  };


  
  
  return (
   
<Box  dir="rtl" lang="ar">
     <Box >
  
      <Header title=" تعديل معلومات الورشه او ندوه   " subTitle="" />
      </Box>
      <Box
        onSubmit={handleSubmit(onSubmit)}
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

  value={EventName}
  onChange={(e) => setEventName(e.target.value)}
  sx={{ flex: 1 }}
  label=" تعديل عنوان الورشه"
  variant="outlined"
/>

<TextField

  value={EventDesc}
  onChange={(e) => setEventDesc(e.target.value)}
  sx={{ flex: 1 }}
  id="outlined-textarea"
  multiline
  label="تعديل الوصف الورشه"
  variant="outlined"
/>
        </Stack>




   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DemoItem  

        // @ts-ignore
     label="اذا لم تحدد تايخ لبدء الورشه سيعتمد تاريخ اليوم" >
       <DateTimePicker
  defaultValue={todayAtNoon}
  minDateTime={todayAt3PM}
 

  onChange={(date) => setEventdate(dayjs(date))}
/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
        
        <Box sx={{ textAlign: "left"  }}>
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
           لقد تم التعديل بنجاح
            </Alert>
          </Snackbar>
         
        
        </Box>
      </Box>
  
  
</Box>
  )
}

export default EditEvent
