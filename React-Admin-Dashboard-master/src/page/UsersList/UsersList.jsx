import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Swal from "sweetalert2";

import Header from "../../components/Header";

function UsersList() {
  const [persons, setPersons] = useState([]);
  const [FilterDataUsers, setFilterDataUsers] = useState([]);

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
        setFilterDataUsers(rowsWithId);
      } else {
        throw new Error("Request failed with status code: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);
  
  const UpdateRole = async (userId, roleN) => {
    try {
      const updatedUser = {
            // Update the properties of the user as needed
        role: roleN,
      };

      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
    
      allUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdate = (userid, typeid, name) => {
    let role = typeid == 0 ? "user" : "admin";
    let role2 = typeid == 1 ? "user" : "admin";
    let text1 = "";
    let text2 = "";
    if (role == "user") {
      text1 = `هل ترغب في تحويل ${name} إلى مشرف؟`;
      text2 = `تم تحويل ${name} إلى مشرف بنجاح`;
    } else {
      text1 = `هل ترغب في تحويل ${name} إلى مستخدم؟`;
      text2 = `تم تحويل ${name} إلى مستخدم بنجاح`;
    }
    Swal.fire({
      title: text1,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "موافق",
      cancelButtonText: "إلغاء",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        let roleN;
        if (typeid == 0) {
          roleN = 1;
        } else {
          roleN = 0;
        }
  
        UpdateRole(userid, roleN);
  
        Swal.fire(text2, "", "success");
  
        // window.location.reload();
      } else Swal.fire("تم الإلغاء", "", "error");
    });
  };
  
  
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
             
              allUsers(); // Refresh the user list after deleting a user
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
      field: "actions",
      headerName: "تعديل",
      width: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { _id, role, firstName } = params.row;
        return (
          <a href="#" onClick={() => handleUpdate(_id, role, firstName)}>
            <BorderColorIcon color="primary" />
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
        valueGetter: (params) => (params.row.role === 0 ? "مستخدم" : "مشرف"),
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
          title=" معلومات المستخدمين"
          subTitle="ستمكنك هذه الصفحة من  الاطلاع ع معلومات المستخدم و تغير دوره الى مشرف للتطبيق او حذفه"
        />
      </Box>
      <Box sx={{ height: 500, width: "99%", mx: "auto" }}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={FilterDataUsers}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default UsersList
