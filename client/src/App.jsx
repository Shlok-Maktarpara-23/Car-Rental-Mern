import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const {showLogin} = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      <Toaster />
      {showLogin && <Login/>}

      {!isOwnerPath && <Navbar/>}
      <AppRoutes />

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
