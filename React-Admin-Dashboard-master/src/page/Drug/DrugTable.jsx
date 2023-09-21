import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Alert, Box, Button  , useTheme} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function DrugTable() {
  const navigate = useNavigate();
  const [drugData, setdrugData] = useState([]);

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
        setdrugData(modifiedData);
      } else {
        throw new Error("Failed to fetch DrugTable data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDrugTable();
  }, []);

  const handleEditClick = (id) => {
    // Navigate to the View Drug component with the Drug ID as a parameter
    navigate(`/ViewDrug/${id}`);
  };

  const handleEditDrug = (id) => {
    // Navigate to the Edit Drug component with the Drug ID as a parameter
    navigate(`/EditDrug/${id}`);
  };

  const handleDeleteDrug = (id) => {
    const confirmationId = drugData.find((item) => item.id === id)._id;

    Swal.fire({
      title: "هل ترغب في حذف الدواء",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "موافق",
      cancelButtonText: "إلغاء",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/deleteDrug/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "تمت الإزالة بنجاح",
                icon: "success",
              });

              const newDataObj = drugData.filter((item) => item.id !== id);
              setdrugData(newDataObj);
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
            <DeleteIcon color="primary" onClick={() => handleDeleteDrug(id)} />
          </a>
        );
      },
    },
    {
      field: "Edit",
      headerName: "عرض",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <a onClick={() => handleEditClick(id)}>
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
          <a onClick={() => handleEditDrug(id)}>
            <EditIcon color="primary" />
          </a>
        );
      },
    },

    {
      field: "drugUrl",
      headerName: "صورة للدواء",
      flex: 1,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        const { drugUrl } = params.row;
        return (
          <img src={drugUrl} alt="وصفة" style={{ width: 100, height: 100 }} />
        );
      },
    },
    {
      field: "drugDesc",
      headerName: "وصف عن الدواء",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },

    {
      field: "drugName",
      headerName: "اسم الدواء",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
  ];

  const handleSubmit = () => {
    navigate("/Drug");
  };

  const theme = useTheme();  
  return (
    <Box>
      <Box sx={{ textAlign: "right", fontWeight: "800" }}>
        <Header
          title="الادوية"
          subTitle="ستمكنك هذه الصفحة من عرض او حذف الدواء"
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
          rows={drugData}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default DrugTable;
