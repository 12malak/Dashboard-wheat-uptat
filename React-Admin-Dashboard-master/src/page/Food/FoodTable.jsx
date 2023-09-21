import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Alert, Box, Button , useTheme } from "@mui/material";


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import Header from "../../components/Header";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useParams, useNavigate } from 'react-router-dom';
import Row1 from "../dashboard/Row1";
function FoodTable() {
  const { id } = useParams();
const [Count ,setCount]= useState(0);
    const navigate = useNavigate();
    const [foodObj, setFoodObj] = useState({});
    console.log("Count" + Count);
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
            setFoodObj(modifiedData);
            setCount(modifiedData.length); // Set the count to the length of modifiedData
          } else {
            throw new Error("Failed to fetch DrugTable data");
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchFoodTable();
      }, []);
    
      const handleEditClick = (id) => {
        // Navigate to the View Food component with the Food ID as a parameter
        navigate(`/ViewFood/${id}`);
      };
    
      const handleEditFood = (id) => {
        // Navigate to the ViewRecipes component with the recipe ID as a parameter
        navigate(`/EditFood/${id}`);
      };

      const handleDeleteFood = (id) => {
        
        Swal.fire({
          title: "هل ترغب في حذف الطعام",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "موافق",
          cancelButtonText: "إلغاء",
          icon: "warning",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:8000/deleteFood/${id}`, {
              method: 'DELETE',
            })
              .then((response) => {
                if (response.ok) {
                  Swal.fire({
                    title: "تمت الإزالة بنجاح",
                    icon: "success",
                  });
      
                  // @ts-ignore
                  const newFoodObj = foodObj.filter((item) => item.id !== id);
                  setFoodObj(newFoodObj);
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
              <a href="#">
                <DeleteIcon color="primary" onClick={() => handleDeleteFood(id)} />
              </a>
            );
          },
        },
        {
          field: 'Edit',
          headerName: 'عرض',
          width: 70,
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
          headerName: "تعديل",
          width: 70,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => {
            const { id } = params.row;
            return (
              
            
              <a  onClick={() => handleEditFood(id)}>
              <EditIcon color="primary" />
            </a>
            );
          },
        },
     
     
       
        {
          field: "foodUrl",
          headerName: "صورة للطعام",
          flex: 1,
          align: "right",
          headerAlign: "right",
          renderCell: (params) => {
            const { foodUrl } = params.row;
            return (
              <img src={foodUrl} alt="وصفة" style={{ width: 100, height: 100 }} />
            );
          },
        },
        {
          field: "foodDesc",
          headerName: "وصف عن الطعام",
          flex: 1,
          align: "right",
          headerAlign: "right",
        },
       
        {
          field: "foodName",
          headerName: "اسم الطعام",
          flex: 1,
          align: "right",
          headerAlign: "right",
        },
        {
          field: "Number",
          headerName: "العدد",
          width: 70,
          align: "right",
          headerAlign: "right",
        },
    
      ];
      const handleSubmit = () => {
       
        navigate("/Food");
      };


      const theme = useTheme();   
  return (
    <>
      <Box>
    <Box sx={{ textAlign: "right", fontWeight: "800" }}>
      <Header
        title="  الاطعمه المسموحه"
        subTitle="ستمكنك هذه الصفحة الاطلاع ع جميع الاطعمه في الموقع و إمكانية الحذف " 
     
      />
      
    </Box>
    {/* <Row1 Count={Count} /> */}
    <Box sx={{ height: 550, width: "99%", mx: "auto"}}>
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
        rows={foodObj}
        // @ts-ignore
        columns={columns}
      />
    </Box>
  </Box> 
    </>
    
  )
}

export default FoodTable
