import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from "sweetalert2";
import Header from "../../components/Header";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import BorderColorIcon from '@mui/icons-material/BorderColor';
function Recipes(props) {
  
  const { ViewRecipes} = props;
  const navigate = useNavigate();
  const [confOrderObj, setConfOrderObj] = useState([]);


  const handleEditClick = (id) => {
    // Navigate to the ViewRecipes component with the recipe ID as a parameter
    navigate(`/ViewRecipes/${id}`);
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllFalseConfirmations");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const modifiedData = data.map((item) => ({
            id: item._id, // Use _id as the unique identifier
            ...item,
          }));
          setConfOrderObj(modifiedData);
        } else {
          throw new Error("Failed to fetch Recipes data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const AcceptConfirmationOrderHandler = (id) => {
    const updatedConfOrderObj = confOrderObj.map((item) => {
      if (item.id === id) {
        return { ...item, Acceptance: true };
      }
      return item;
    });
  
    const confirmationId = updatedConfOrderObj.find((item) => item.id === id)._id;
  
    Swal.fire({
      title: "هل ترغب في قبول الوصفة؟",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "موافق",
      cancelButtonText: "إلغاء",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/changeToTrue`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: confirmationId }),
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              Swal.fire({
                title: "تمت الموافقة بنجاح",
                icon: "success",
              });
              setConfOrderObj(updatedConfOrderObj);
              navigate("/");
            } else {
              Swal.fire({
                title: "حدث خطأ أثناء الموافقة",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "حدث خطأ أثناء الموافقة",
              icon: "error",
            });
          });
      } else {
        Swal.fire("تم الإلغاء", "", "error");
      }
    });
  };
  const DeleteConfirmationOrderHandler = (id) => {
    const confirmationId = confOrderObj.find((item) => item.id === id)._id;
  
    Swal.fire({
      title: "هل ترغب في حذف الوصفة",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "موافق",
      cancelButtonText: "إلغاء",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/deleteConfirmation/${confirmationId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "تمت الإزالة بنجاح",
                icon: "success",
              });
  
              const newConfOrderObj = confOrderObj.filter((item) => item.id !== id);
              setConfOrderObj(newConfOrderObj);
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
      field: "actions",
      headerName: "قبول",
      width: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id } = params.row;
        return (
          
        
          <a href="#"  onClick={() => AcceptConfirmationOrderHandler(id)}>
          <CheckCircleOutlineIcon color="primary" />
        </a>
        );
      },
    },
    {
      field: "delete",
      headerName: "حذف",
      width: 70,
      align: "center",
      
      headerAlign: "center",
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <a href="#" onClick={() => DeleteConfirmationOrderHandler(id)}>
          <DeleteIcon color="primary" />
        </a>
        );
      },
    },
    // {
    //   field: "View",
    //   headerName: "  عرض" ,
    //   width: 100,
    //   align: "center",
      
    //   headerAlign: "center",
    //   renderCell: (params) => {
    //     const { id } = params.row;
    //     return (
    //       <a href="#" >
    //       <FullscreenIcon color="primary" />
    //     </a>
    //     );
    //   },
    // },

   
    {
      field: "foodUrl",
      headerName: "صورة للوصفة",
      flex: 1,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        const { foodUrl } = params.row;
        return (
          <img  src={`http://localhost:8000/${foodUrl}`} alt="وصفة" style={{ width: 100, height: 100 }} />
        );
      },
    },
    {
      field: "foodDesc",
      headerName: "وصف عن الوصفة",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "phone",
      headerName: "رقم الموبايل",
      width: 150,
     align: "right",
     headerAlign: "right",
    },
    {
      field: "foodName",
      headerName: "اسم الوصفة",
      width: 80,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "price",
      headerName: "السعر",
      width: 80,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "quantity",
      headerName: "الكمية",
      width: 100,
      align: "right",
      headerAlign: "right",
    },
    
    {
      field: "name",
      headerName: "اسم الشيف",
      width: 100,
      align: "right",
      headerAlign: "right",
    },
  ];



  return (
    <Box>
    <Box sx={{ textAlign: "right", fontWeight: "800" }}>
      <Header
        title="الوصفات"
        subTitle=""
      />
    </Box>
    <Box sx={{ height: 450, width: "99%", mx: "auto" }}>
      <DataGrid
        slots={{
          toolbar: GridToolbar,
        }}
        rows={confOrderObj}
        // @ts-ignore
        columns={columns}
      />
    </Box>
  </Box>
);
}

export default Recipes;
