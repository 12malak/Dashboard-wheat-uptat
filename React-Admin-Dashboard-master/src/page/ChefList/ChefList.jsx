import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Swal from "sweetalert2";

import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

function ChefList() {
    const [Datachef, setDatachef] = useState([]);
    const [FilterDatachef, setFilterDatachef] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const allProviders = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/Providers");
            if (response.ok) {
            const data = await response.json();
            console.log(data);
            setDatachef(data);
            const modifiedData = data.map((item) => ({
              id: item._id, // Use _id as the unique identifier
              ...item,
            }));
            setFilterDatachef(modifiedData);
          } else {
            throw new Error("Failed to fetch payment data");
          }
        } catch (error) {
          console.error(error);
        }
      };
      
       
      allProviders();
        }, []);
      
        
  const handleDelete = (id, name) => {
    Swal.fire({
      title: `هل ترغب في حذف ${name}?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "موافق",
      cancelButtonText: "إلغاء",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`${name} تمت إزالته بنجاح`, "", "success");
        fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
                navigate("/");
                // @ts-ignore
                allProviders();
            }
          })
          .catch((error) => console.log(error.message));
      } else {
        Swal.fire("تم الإلغاء", "", "error");
      }
    });
  };










    const columns = [
       
        {
          field: "delete",
          headerName: "حذف",
          width: 100,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => {
            const { _id, firstName } = params.row;
            return (
              <a href="#" onClick={() => handleDelete(_id, firstName)}>
                <DeleteIcon color="primary" />
              </a>
            );
          },
        },
        
        {
            field: "role",
            headerName: "الدور",
            flex: 1,
            align: "right",
            headerAlign: "right",
            valueGetter: (params) => (params.row.role ===0 ? "مستخدم" : "شيف"),
          },
       
       
       
        {
          field: "email",
          headerName: " البريد الالكتروني",
          flex: 1,
         align: "right",
         headerAlign: "right",
        },
        {
          field: "firstName",
          headerName: "الاسم ",
          flex: 1,
          align: "right",
          headerAlign: "right",
        },
      ];
    
      return (
        <Box>
          <Box sx={{ textAlign: "right", fontWeight: "800" }}>
            <Header
              title=" معلومات الطهاه"
              subTitle="ستمكنك هذه الصفحة من  الاطلاع ع معلومات الطهاه  و حذفه"
            />
          </Box>
          <Box sx={{ height: 500, width: "99%", mx: "auto" }}>
            <DataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              rows={FilterDatachef}
              // @ts-ignore
              columns={columns}
            />
          </Box>
        </Box>
      )
    }
export default ChefList
