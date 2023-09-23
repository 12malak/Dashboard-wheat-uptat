
import AppBar from '@mui/material/AppBar';
import moment from "moment/moment";
import {
  Box,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const drawerWidth = 200;
const drawerWidthdown = 150;



const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  function handleLogOut(){

    


    Swal.fire({
      title: ` logout?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
  }
  ).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
  
          Swal.fire(`  done `, '', 'success');
       
          // updateSignStatus("signUp")
          localStorage.setItem("SignStatus","signUp")
          localStorage.removeItem("auth");
          localStorage.removeItem("roles");
          window.location.href = 'http://localhost:3000/';
 
  
      } else
          Swal.fire(' Cancelled', '', 'error')
  
  })
  
  }
  return (
    <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`,
         mr: `${drawerWidth}px` ,
       
         }}
      >
        <Toolbar>

   

        
     
        
          <Stack direction={"row"}>
          <IconButton color="inherit">
        <LogoutIcon  onClick={handleLogOut} > 
        </LogoutIcon>
          </IconButton>
          {theme.palette.mode === "light" ? (
            <IconButton
       
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setMode((prevMode) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color="inherit"
            >
              <LightModeOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setMode((prevMode) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color="inherit"
            >
              <DarkModeOutlinedIcon />
            </IconButton>
          )}

          {/* <IconButton color="inherit">
            <NotificationsOutlinedIcon />
          </IconButton>

          <IconButton color="inherit">
            <SettingsOutlinedIcon />
          </IconButton> */}

         
        </Stack>
        <Box flexGrow={1} />
        <Typography  noWrap component="div">
        <span>{moment().format("dddd, Do MMM YYYY")}</span>
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default TopBar;