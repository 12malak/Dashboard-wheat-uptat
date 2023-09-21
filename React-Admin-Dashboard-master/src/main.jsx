import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Dashboard from "./page/dashboard/Dashboard";
import Team from "./page/team/Team";
import Contacts from "./page/contacts/Contacts";
import Invoices from "./page/invoices/Invoices";
import Form from "./page/form/Form";
import Calendar from "./page/calendar/Calendar";
import FAQ from "./page/faq/FAQ";
import BarChart from "./page/barChart/BarChart";
import PieChart from "./page/pieChart/PieChart";
import LineChart from "./page/lineChart/LineChart";
import Geography from "./page/geography/Geography";
import NotFound from "./page/notFound/NotFound";
import Food from "./page/Food/Food";
import AddEvent from "./page/AddEvent/AddEvent";
import Drug from "./page/Drug/Drug";
import Recipes from "./page/Recipes/Recipes";
import TableContect from "./page/TableContect/TableContect";
import Orders from "./page/Orders/Orders";
import AdminsList from "./page/AdminsList/AdminsList";
import UsersList from "./page/UsersList/UsersList";
import ChefList from "./page/ChefList/ChefList";
import ViewRecipes from "./page/Recipes/ViewRecipes";
import EditAbout from "./page/EditAbout/EditAbout";
import EdetContact from "./page/EdetContact/EdetContact";
import DrugTable from "./page/Drug/DrugTable";
import FoodTable from "./page/Food/FoodTable";
import EventTable from "./page/AddEvent/EventTable";
import ViweEvent from "./page/AddEvent/ViewEvent";
import ViewFood from "./page/Food/ViewFood";
import ViewDrug from "./page/Drug/ViewDrug";
import EditFood from "./page/Food/EditFood";
import EditDrug from "./page/Drug/EditDrug";
import EditEvent from "./page/AddEvent/EditEvent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="team" element={<Team />} />
      <Route path="EventTable" element={<EventTable />} />
      <Route path="FoodTable" element={<FoodTable />} />
      <Route path="TableContect" element={<TableContect />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="form" element={<Form />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="bar" element={<BarChart />} />
      <Route path="pie" element={<PieChart />} />
      <Route path="line" element={<LineChart />} />
      <Route path="geography" element={<Geography />} />
      <Route path="Food" element={<Food />} />
      <Route path="AddEvent" element={<AddEvent />} />
      <Route path="Drug" element={<Drug />} />
      <Route path="Orders" element={<Orders />} />
      <Route path="AdminsList" element={<AdminsList />} />
      <Route path="/ViewFood/:id" element={<ViewFood/>} />
      <Route path="/EditFood/:id" element={<EditFood/>} />
      <Route path="/ViewRecipes/:id" element={<ViewRecipes/>} />
      <Route path="/EditEvent/:id" element={<EditEvent/>} />
      <Route path="/ViweEvent/:id" element={<ViweEvent/>} />
      <Route path="Recipes" element={<Recipes />} />
      <Route path="/EditDrug/:id" element={<EditDrug/>} />
      <Route path="/ViewDrug/:id" element={<ViewDrug/>} />
      <Route path="UsersList" element={<UsersList />} />
      <Route path="ChefList" element={<ChefList />} />
      <Route path="EditAbout" element={<EditAbout />} />
      <Route path="EdetContact" element={<EdetContact />} />
      <Route path="DrugTable" element={<DrugTable />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
