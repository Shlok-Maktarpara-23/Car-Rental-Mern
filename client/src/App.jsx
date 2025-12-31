import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Login from "./components/Login";

const App = () => {
  const [ShowLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      {ShowLogin && <Login setShowLogin={setShowLogin}/>}

      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <AppRoutes />

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
