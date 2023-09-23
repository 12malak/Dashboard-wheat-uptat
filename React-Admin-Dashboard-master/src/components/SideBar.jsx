import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { Avatar, styled, useTheme, Typography, Tooltip } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import EditIcon from "@mui/icons-material/Edit";
// @ts-ignore
import Logo from "./Logo.png";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

const drawerWidth = 200;
const drawerWidthdown = 150;
const Array1 = [
  { text: "لوحه التحكم", icon: <HomeOutlinedIcon />, path: "/" },
  {
    text: "خريطه",
    icon: <HelpOutlineOutlinedIcon />,
    path: "/faq",
  },
  // { text: "إدارة الفريق", icon: <PeopleOutlinedIcon />, path: "/team" },

  { text: "تقويم", icon: <CalendarTodayOutlinedIcon />, path: "/calendar" },
  {
    text: " تعديل من نحن ",
    icon: <EditIcon />,
    path: "/EditAbout",
  },
];

// const Array3 = [
//   { text: "Bar Chart", icon: <BarChartOutlinedIcon />, path: "/bar" },
//   { text: "Pie Chart", icon: <PieChartOutlineOutlinedIcon />, path: "/pie" },
//   { text: "Line Chart", icon: <TimelineOutlinedIcon />, path: "/line" },
//   { text: "Geography Chart", icon: <MapOutlinedIcon />, path: "/geography" },
// ];
const Array3 = [
  { text: " الاطعمة", icon: <LocalPizzaIcon />, path: "/FoodTable" },
  { text: " الورشات", icon: <EventIcon />, path: "/EventTable" },
  {
    text: " الادوية",
    icon: <MedicationLiquidIcon />,
    path: "/DrugTable",
  },
];

const Array6 = [
  { text: "الطلبات", icon: <ReceiptOutlinedIcon />, path: "/TableContect" },
  {
    text: "مسجات التواصل",
    icon: <ContactsOutlinedIcon />,
    path: "/Orders",
  },
  { text: "  الوصفات", icon: <LocalDiningIcon />, path: "/Recipes" },
];
const Array7 = [
  {
    text: "  قائمه المشرفين",
    icon: <AdminPanelSettingsOutlined />,
    path: "/AdminsList",
  },
  {
    text: "  قائمه المستخدمين",
    icon: <PersonOutlinedIcon />,
    path: "/UsersList",
  },
  { text: "  قائمه الطهاه", icon: <LocalDiningIcon />, path: "/ChefList" },
];
// const Array5 = [

//   { text: "تعديل معلومات التواصل  ", icon: <EditRoadIcon />, path: "EdetContact" },

// ];
const SideBar = ({ open, handleDrawerClose }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Drawer
      sx={{
      
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />

      <Avatar
        sx={{
          mx: "auto",
          width: 76,
          height: 76,
          my: 1,

          transition: "0.25s",
        }}
        variant="square"
        src={Logo}
      />

      <Typography
        align="center"
        sx={{ fontSize: 19, transition: "0.25s", px: 2, fontWeight: 600 }}
      >
        أصدقاء مرضى حساسيه القمح
      </Typography>

      <Divider />
      <List>
        {Array1.map((item, index) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : null,
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.dark
                    : null,
              }}
            >
              <ListItemText primary={item.text} />
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {Array3.map((item, index) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : null,
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.dark
                    : null,
              }}
            >
              <ListItemText primary={item.text} />
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {Array7.map((item, index) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : null,
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.dark
                    : null,
              }}
            >
              <ListItemText primary={item.text} />
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {Array6.map((item, index) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : null,
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.dark
                    : null,
              }}
            >
              <ListItemText primary={item.text} />
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
    </Drawer>
  );
};

export default SideBar;
