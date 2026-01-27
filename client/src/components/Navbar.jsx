import React, { useState } from "react";
import { logo, search_icon, close_icon, menu_icon } from "../assets/index";
import { menuLinks } from "../constants/route";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from "motion/react";

const Navbar = () => {
  const{setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async() => {
    try {
      const {data} = await axios.post('/api/owners/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColour relative transition-all 
            ${location.pathname === "/" && "bg-light"}`}
      >
        <Link to={"/"}>
          <motion.img whileHover={{scale: 1.05}} src={logo} alt="logo" className="h-8" />
        </Link>

        <div
          className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:p-4 right-0 flex items-start flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 transition-all duration-300 z-50 ${
            location.pathname === "/" ? "bg-light" : "bg-white"
          } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
        >
          {menuLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              {link.name}
            </Link>
          ))}

          <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColour px-3 rounded-full max-w-56">
            <input
              type="text"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              placeholder="Search Cars"
            />
            <img src={search_icon} alt="search" />
          </div>

          <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
            <button onClick={() => isOwner ? navigate('/owner') : changeRole()} className="cursor-pointer">{isOwner ? 'Dashboard' : 'List cars'}</button>

            <button onClick={() => {user ? logout() : setShowLogin(true)}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">
              {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>

        <button className="sm:hidden cursor-pointer" aria-label="Menu" onClick={() => setOpen(!open)}>
            <img src={open ? close_icon : menu_icon} alt="menu" />
        </button>
      </motion.div>
    </>
  );
};

export default Navbar;
