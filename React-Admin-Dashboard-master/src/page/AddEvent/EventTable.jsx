import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Alert, Box, Button, useTheme  } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from "sweetalert2";
import Header from "../../components/Header";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import BorderColorIcon from '@mui/icons-material/BorderColor';


function EventTable() {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState([]);

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
            setEventData(modifiedData);
          } else {
            throw new Error("Failed to fetch EventTable data");
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchEventTable();
      }, []);

      const handleEditClick = (id) => {
        // Navigate to the ViewRecipes component with the recipe ID as a parameter
        navigate(`/ViweEvent/${id}`);
      };


      
    const handleDeleteEvent = (id) => {

      
        Swal.fire({
          title: "هل ترغب في حذف الورشة",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "موافق",
          cancelButtonText: "إلغاء",
          icon: "warning",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:8000/deleteEvent/${id}`, {
              method: 'DELETE',
            })
              .then((response) => {
                if (response.ok) {
                  Swal.fire({
                    title: "تمت الإزالة بنجاح",
                    icon: "success",
                  });
      
                  const newDataObj = eventData.filter((item) => item.id !== id);
                  setEventData(newDataObj);
                } else {
                  Swal.fire({
                    title: "حدث خطأ أثناء الحذف",
                    icon: "error",
                  });
                }
              })
              .catch((error) => {
                console.error(error);
                Swal.fire({
                  title: "حدث خطأ أثناء الحذف",
                  icon: "error",
                });
              });
          } else {
            Swal.fire("تم الإلغاء", "", "error");
          }
        });
      };



      const handleEditEvent = (id) => {
        // Navigate to the Edit Event component with the Drug ID as a parameter
        navigate(`/EditEvent/${id}`);
      };



      
      const columns = [
        {
            field: "delete",
            headerName: "حذف",
            width: 70,
            align: "center",
            
            headerAlign: "center",
            renderCell: (params) => {
              const { id } = params.row;
              return (
                <a href="#" >
                <DeleteIcon color="primary" onClick={() => handleDeleteEvent(id)} />
              </a>
              );
            },
          },
          {
            field: "actions",
            headerName: "تعديل",
            width: 70,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
              const { id } = params.row;
              return (
                
              
                <a onClick={() => handleEditEvent(id)}>
                <EditIcon color="primary" />
              </a>
              );
            },
          },
        {
          field: 'Edit',
          headerName: 'عرض',
          width: 100,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => {
            const { id } = params.row;
            return (
              <a  onClick={() => handleEditClick(id)}>
                <FullscreenIcon color="primary" />
              </a>
            );
          },
        },
    
       
        {
          field: "eventDate",
          headerName: "تاريخ الندوه",
          flex: 1,
          align: "right",
          headerAlign: "right",
        
        },
        {
          field: "eventDesc",
          headerName: "وصف عن الندوة",
          flex: 1,
          align: "right",
          headerAlign: "right",
        },
       
        {
          field: "eventTitle",
          headerName: "عنوان الندوة ",
          flex: 1,
          align: "right",
          headerAlign: "right",
        },
      
    
      ];
      const handleSubmit = () => {
       
        navigate("/AddEvent");
      };
      const theme = useTheme();
  return (
    <>
       <Box>
    <Box sx={{ textAlign: "right", fontWeight: "800" }}>
      <Header
        title="  الورشات و الندوات المعروضه "
        subTitle="ستمكنك هذه الصفحة الاطلاع ع جميع الورشات والندوات  في الموقع و إمكانية الحذف " 
      />
    </Box>
    <Box sx={{ height: 550, width: "99%", mx: "auto" }}>
    <Button
                type="submit"
                variant="outlined"
                color="primary"
          
                sx={{ fontSize: "18px", fontWeight: "400",color: theme.palette.text.secondary }}
                onClick={handleSubmit}
              >
                إضافه جديده
              </Button>
      <DataGrid
        slots={{
          toolbar: GridToolbar,
        }}
       
        // @ts-ignore
        rows={eventData}
        // @ts-ignore
        columns={columns}
      />
    </Box>
  </Box> 
    </>
  )
}

export default EventTable
