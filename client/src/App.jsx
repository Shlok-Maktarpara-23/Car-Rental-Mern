import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Footer from "./components/Footer";

const App = () => {
  const [ShowLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <AppRoutes />

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
