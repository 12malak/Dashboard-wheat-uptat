import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header";
import Swal from 'sweetalert2';

function Orders() {
    const [reply, setReply] = useState("");
    const [contactObj, setContactObj] = useState([]);
  
    useEffect(() => {
      const showContactsHandler = async () => {
        try {
            const response = await fetch("http://localhost:8000/getAllContacts");
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            const modifiedData = data.map((item) => ({
              id: item._id, // Use _id as the unique identifier
              ...item,
            }));
            setContactObj(modifiedData);
          } else {
            throw new Error("Failed to fetch payment data");
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      showContactsHandler();
    }, []);
  
   
    const handleReply = async (messageId) => {
      try {
        const requestData = {
          messageId: messageId,
          reply: reply,
        };
        const response = await fetch("http://localhost:4000/sendReply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        const data = await response.json();
        console.log("Reply sent:", data);
        setReply("");
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    };
  

    const handledeleteContact = (id) => {

    
      Swal.fire({
        title: "هل ترغب في حذف الطلبية",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "موافق",
        cancelButtonText: "إلغاء",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:8000/deleteContact/${id}`, {
            method: 'DELETE',
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire({
                  title: "تمت الإزالة بنجاح",
                  icon: "success",
                });
    
                const newDataObj = contactObj.filter((item) => item.id !== id);
                setContactObj(newDataObj);
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
            <DeleteIcon color="primary" onClick={() => handledeleteContact(id)} />
          </a>
          );
        },
      },
      {
          field: "actions",
        
          width: 87,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => {
            const { id } = params.row;
            const theme = useTheme();
            return (
              <a href={`mailto:${id.patientGmail}`}>
              <Button
             variant="contained"
               sx={{ color:"#ffffff"}}
                onClick={() => handleReply(id.messageId)}
              >
                رسالة
              </Button>
              </a>
            );
          },
        },
      {
        field: "patientGmail",
        headerName: "البريد الالكتروني",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "patientMsg",
        headerName: "الرساله النصية",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "phoneNumber",
        headerName: "رقم الموبايل",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "patientName",
        headerName: "الاسم",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
     
    ];
  
    return (
      <Box>
        <Box sx={{ textAlign: "right", fontWeight: "800" }}>
         
           <Header
          title="مسجات التواصل"
          subTitle="ستمكنك هذه الصفحة من الرد على جميع استفسارات الزائرين للموقع"
        />
        </Box>
        <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
          <DataGrid
            slots={{
              toolbar: GridToolbar,
            }}
            rows={contactObj}
            // @ts-ignore
            columns={columns}
          />
        </Box>
      </Box>
    );
  }
  

export default Orders
