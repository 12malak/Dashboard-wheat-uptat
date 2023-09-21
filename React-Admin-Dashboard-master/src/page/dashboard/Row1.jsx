import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Card from "./card";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { data1, data2, data3, data4 } from "./data";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import EventIcon from "@mui/icons-material/Event";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
const Row1 = () => {
  const [CountFood ,setCountFood]= useState(0);
  const [CountEvent ,setCountEvent]= useState(0);
  const [CountDrug ,setCountDrug]= useState(0);
  const theme = useTheme();


   //-------------------- Food Count
  const fetchFoodTable = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllFoods");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const modifiedData = data.map((item) => ({
            id: item._id, // Use _id as the unique identifier
            ...item,
          }));
  
          setCountFood(modifiedData.length); // Set the count to the length of modifiedData
        } else {
          throw new Error("Failed to fetch DrugTable data");
        }
      } catch (error) {
        console.error(error);
      }
    };
   
    useEffect(() => {
      fetchFoodTable();
    }, [setCountFood]);

    //-------------------- Event Count
    const fetchEventTable = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllEvents");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const modifiedData = data.map((item) => ({
            id: item._id, // Use _id as the unique identifier
            ...item,
          }));
          setCountEvent(modifiedData.length); // Set the count to the length of modifiedData
        } else {
          throw new Error("Failed to fetch EventTable data");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchEventTable();
    }, [setCountEvent]);

     //-------------------- Drug Count
     const fetchDrugTable = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllDrugs");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const modifiedData = data.map((item) => ({
            id: item._id, // Use _id as the unique identifier
            ...item,
          }));
          setCountDrug(modifiedData.length); // Set the count to the length of modifiedData
        } else {
          throw new Error("Failed to fetch DrugTable data");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchDrugTable();
    }, [setCountDrug]);


      //-------------------- allUsers Count

      const [persons, setPersons] = useState([]);
      const [CountDataUsers, setCountDataUsers] = useState(0);
    
      const allUsers = async () => {
        const token = localStorage.getItem("auth");
        try {
          const response = await fetch("http://localhost:5000/api/users", {
            headers: {
              Authorization: token,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            const rowsWithId = data.map((row) => ({
               ...row, id: row._id })); // Add the id property
            setPersons(rowsWithId);
            setCountDataUsers(rowsWithId.length);
          } else {
            throw new Error("Request failed with status code: " + response.status);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        allUsers();
      }, [setCountDataUsers]);

  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between" }}
      marginBottom={3}
    >
      <Card
        icon={<MedicationLiquidIcon
          sx={{ fontSize:  "50px", color: theme.palette.text.secondary}} />}
        title={CountDrug}
        subTitle={"عدد الادويه المعروضه " }
        increase={"+14%"}
        data={data1} scheme={"nivo"}      />

      <Card
        icon={
          <LocalPizzaIcon
            sx={{ fontSize:  "45px", color: theme.palette.text.secondary}}
          />
        }
        title={CountFood}
        subTitle={"عدد الاطعمه المعروضه "}
        increase={"+21%"}
        data={data2}
        scheme={"category10"} 
      />

      <Card
        icon={
          <EventIcon
            sx={{ fontSize:  "45px", color: theme.palette.text.secondary }}
          />
        }
        title={CountEvent}
        subTitle={"عدد الورشات المعروضه "}
        increase={"+5%"}
        data={data3}
        scheme={"accent"} 
      />
       <Card
        icon={
          <PersonAddIcon
            sx={{ fontSize:  "45px", color: theme.palette.text.secondary }}
          />
        }
        title={CountDataUsers}
        subTitle={"عدد المستخدمين في الموقع "}
        increase={"+5%"}
        data={data3}
        scheme={"accent"} 
      />
     
    </Stack>
    
  );
};

export default Row1;
