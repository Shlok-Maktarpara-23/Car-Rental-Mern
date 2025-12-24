import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarDetails from "../pages/CarDetails";
import MyBookings from "../pages/MyBookings";
import Layout from "../pages/owner/Layout";
import Dashboard from "../pages/owner/Dashboard";
import AddCar from "../pages/owner/AddCar";
import ManageCars from "../pages/owner/ManageCars";
import ManageBookings from "../pages/owner/ManageBookings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/my-bookings" element={<MyBookings />} />

      {/* Owner Routes */}
      <Route path="/owner" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-car" element={<AddCar />} />
        <Route path="manage-cars" element={<ManageCars />} />
        <Route path="manage-bookings" element={<ManageBookings />} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
