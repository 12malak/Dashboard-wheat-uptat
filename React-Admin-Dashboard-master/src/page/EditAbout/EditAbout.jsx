import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

function EditAbout() {
  const [aboutTitle1, setAboutTitle1] = useState("");
  const [aboutUs1, setAboutUs1] = useState("");
  const [aboutTitle2, setAboutTitle2] = useState("");
  const [aboutUs2, setAboutUs2] = useState("");
  const [aboutTitle3, setAboutTitle3] = useState("");
  const [aboutUs3, setAboutUs3] = useState("");
  const [aboutUsId, setAboutUsId] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleClick = () => {
    setOpen(true);
  };

  const fetchAboutUs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/aboutUs");
      const data = await response.json();
      setAboutTitle1(data[0].title1);
      setAboutUs1(data[0].text1);
      setAboutTitle2(data[0].title2);
      setAboutUs2(data[0].text2);
      setAboutTitle3(data[0].title3);
      setAboutUs3(data[0].text3);
      setAboutUsId(data[0]._id);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedAboutUs = {
        title1: aboutTitle1,
        text1: aboutUs1,
        title2: aboutTitle2,
        text2: aboutUs2,
        title3: aboutTitle3,
        text3: aboutUs3,
      };

      await fetch(`http://localhost:5000/api/aboutUs/${'64e912bba398a252c045a336'}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAboutUs),
      });

      fetchAboutUs(); // Refresh the aboutUs data after updating
    } catch (error) {
      console.error("Error updating aboutUs:", error);
    }
  };

  const handleAboutUs = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    handleUpdate();
    handleClick();
  };

  const onSubmit = (e) => {
    console.log("doneeeeeeeeeeee");
    handleClick();
    handleAboutUs(e);
  };

  return (
    <Box dir="rtl" lang="ar">
      <Box >
        <Header title="تعديل صفحه من نحن" subTitle=" " />

        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          noValidate
          autoComplete="off"
        >
          <Stack sx={{ gap: 2 }} direction={"row"}>
            <TextField
              sx={{ flex: 1 }}
              label="استبدل عنوان نبذه عنا "
              variant="outlined"
              value={aboutTitle1}
              onChange={(e) => setAboutTitle1(e.target.value)}
            />

            <TextField
              sx={{ flex: 1 }}
              id="outlined-textarea"
              label="أكتب وصف نبذه عنا"
              multiline
              value={aboutUs1}
              onChange={(e) => setAboutUs1(e.target.value)}
            />
          </Stack>

          <Stack sx={{ gap: 2 }} direction={"row"}>
          <TextField
  sx={{ flex: 1 }}
  label="استبدل عنوان رؤيتنا  "
  variant="outlined"
  value={aboutTitle2}
  onChange={(e) => setAboutTitle2(e.target.value)}
/>

<TextField
  sx={{ flex: 1 }}
  id="outlined-textarea"
  label="أكتب وصف رؤيتنا"
  multiline
  value={aboutUs2}
  onChange={(e) => setAboutUs2(e.target.value)}
/>
          </Stack>

          <Stack sx={{ gap: 2 }} direction={"row"}>
          <TextField
  sx={{ flex: 1 }}
  label="استبدل عنوان مهمتنا  "
  variant="outlined"
  value={aboutTitle3}
  onChange={(e) => setAboutTitle3(e.target.value)}
/>

<TextField
  sx={{ flex: 1 }}
  id="outlined-textarea"
  label="أكتب وصف عن مهمتنا"
  multiline
  value={aboutUs3}
  onChange={(e) => setAboutUs3(e.target.value)}
/>
          </Stack>

          <Box sx={{ textAlign: "left" }}>
            <Button
              type="submit"
              sx={{ fontSize: "20px", fontWeight: "800" , color:"#ffffff" }}
              variant="contained"
            >
             تم التعديل 
            </Button>

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="info"
                sx={{ width: "100%", fontSize: "20px", lineHeight: "22px" }}
              >
                لقد تم التعديل
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditAbout;