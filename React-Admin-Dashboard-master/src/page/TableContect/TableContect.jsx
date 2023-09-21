import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from "sweetalert2";
import Header from "../../components/Header";

function TableContect() {
    const [reply, setReply] = useState("");
  const [PaymentObj, setPaymentObj] = useState([]);

  useEffect(() => {
    const showPaymentHandler = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllPayment");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const modifiedData = data.map((item) => ({
            id: item._id, // Use _id as the unique identifier
            ...item,
          }));
          setPaymentObj(modifiedData);
        } else {
          throw new Error("Failed to fetch payment data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    showPaymentHandler();
  }, []);

  const handleButtonClick = (id) => {
    // Handle button click for a specific row with the given id
    console.log("Button clicked for row with id:", id);
    // Add your custom logic here
  };
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


  const handleDeleteDrug = (id) => {

    
    Swal.fire({
      title: "هل ترغب في حذف الدواء",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "موافق",
      cancelButtonText: "إلغاء",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/deleteOrders/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "تمت الإزالة بنجاح",
                icon: "success",
              });
  
              const newDataObj = PaymentObj.filter((item) => item.id !== id);
              setPaymentObj(newDataObj);
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
          <DeleteIcon color="primary" onClick={() => handleDeleteDrug(id)} />
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
          return (
            <a href={`mailto:${id.patientGmail}`}>
            <Button
              variant="contained"
              sx={{  color:"#ffffff"}}
              onClick={() => handleReply(id.messageId)}
            >
              رسالة
            </Button>
            </a>
          );
        },
      },
    {
      field: "Governorate",
      headerName: "المحافظة",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "address",
      headerName: "العنوان",
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
      field: "UserName",
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
            title=" الطلبات"
            subTitle="ستمكنك هذه الصفحة من ارسال رساله للزبون و تخزين جميع الطلبات "
          />
      </Box>
      <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={PaymentObj}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default TableContect;