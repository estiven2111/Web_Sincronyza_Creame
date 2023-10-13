import { useState } from "react";
import { NavLink,Link } from "react-router-dom";
import { MdPayment, MdLogin } from "react-icons/md";
import { TbForms } from "react-icons/tb";
import { SlBadge } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { IoMenuSharp } from "react-icons/io5";
import icon from "../../assets/img/icon.png"
import SearchBar from "../searchBar/searchBar";
import WelcomeBar from "./welcomeBar";
import Logout from "./logout";

function NavBar() {
  // return (
  //   <div className="container bg-slate-50">
  //   <button className="">
  //     app-creame
  //   </button>
  //   <p className='text-red-300 uppercase' >hola como estas</p>
  //   <ThemeToggle />
  // </div>
  // )
  let activeStyle = {
    fontWeight: "bold",
    // color: "#0055fb",
    paddingBottom: "2px", // Add padding to create space for the border
    borderBottom: "2px solid ",
  };
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="lg:px-20 bg-primaryblue/80 transition-colors z-20 duration-500 dark:bg-darkblue fixed top-0 left-0 w-full bg-neutral-500">
      <div className="px-5">
        <div className="flex justify-between items-center h-[90px]  my-5">
          <div className="flex gap-6 sm:grid sm:grid-cols-3 w-full  text-white items-center relative">
            {/* Menu toggle button for medium and small screens */}
            {/* <div className=" md:col-span-2 text-white flex items-center"> */}
            <div className="  text-white flex items-center  justify-center">
              <button
                className={`lg:hidden block text-white text-xl transition-transform duration-200 ease-in-out focus:outline-none ${
                  showMenu ? "rotate-90" : "rotate-0"
                }`}
                onClick={toggleMenu}
              >
                {showMenu ? (
                  <VscChromeClose className="text-3xl" />
                ) : (
                  <IoMenuSharp className="text-4xl" />
                )}
              </button>
              <div className="hidden gap-5 lg:flex lg:col-span-2 ">
                <NavLink
                  to="/Actividades"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <div className="cursor-pointer  hover:scale-105 duration-200 md:text-lg text-md font-medium mr-28">
                    Actividades
                  </div>
                </NavLink>
                <NavLink
                  to="/Gastos"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <div className="cursor-pointer  hover:scale-105 duration-200 md:text-lg text-md font-medium mr-28">
                   Gastos
                  </div>
                </NavLink>
                <NavLink
                  to="/Graficas"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <div className="cursor-pointer  hover:scale-105 duration-200 md:text-lg text-md font-medium mr-28">
                  Graficas
                  </div>
                </NavLink>
              </div>
            </div>

            <div className="flex items-center justify-center text-white ">
              <Link to="/" >
                <img
                  className="duration-200 lg:w-60 lg:h-32 md:w-72 sm:w-64 "
                  src={icon}
                  alt="logo"
                />
              
              </Link>
            </div>

            {/* <div className="flex gap-3 sm:col-span-2 sm:justify-end"> */}
            <div className="flex gap-3  sm:justify-end">
              <div className=" flex justify-end gap-5 items-center mr-36">
                <Link to="/logout">
                <button className="border-[1.5px] hidden lg:block text-white py-2 px-3  rounded-full  hover:scale-105 duration-200 md:text-lg text-md  border-white hover:border-slate-400  font-medium">
                  Salir
                </button>
                </Link>
                <Link to="/login">
                <button className="border-[1.5px] hidden lg:block text-white py-2 px-3  rounded-full  hover:scale-105 duration-200 md:text-lg text-md  border-white hover:border-slate-400  font-medium">
                 Entrar
                </button>
                </Link>
                {/* <ThemeToggle /> */}
              </div>
             
            </div>
          </div>
        </div>
        <SearchBar/>
        <WelcomeBar/>
        <Logout/>
      </div>

      {/* Menu content for medium and small screens */}
      {showMenu && (
        // <div className="bg-slate-50 dark:bg-slate-950 py-3 px-5 mt-3 dark:shadow-neutral-700 shadow-md text-black dark:text-white">

        <div
          className={`lg:hidden bg-slate-50 dark:bg-slate-950 py-3 px-5 mt-[0.5px] dark:shadow-neutral-700 shadow-md w-full text-black dark:text-white absolute ${
            showMenu
              ? "opacity-100 max-h-full transition-all duration-300 ease-in-out"
              : "opacity-0 max-h-0"
          }`}
          style={{
            maxHeight: showMenu ? "500px" : "0",
            visibility: showMenu ? "visible" : "hidden",
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div
              className="flex pl-5 mb-2 gap-3 pt-4 items-center hover:text-lightblueone cursor-pointer"
              onClick={toggleMenu}
            >
              <MdLogin className="" />
              Entrar
            </div>
          </NavLink>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div
              className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer "
              onClick={toggleMenu}
            >
              <MdPayment className="" /> Pagar Arriendo
            </div>
          </NavLink>
          <NavLink
            to="/aplicar"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div
              className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer"
              onClick={toggleMenu}
            >
              <TbForms /> Aplicar
            </div>
          </NavLink>
          <NavLink
            to="/arriendaloflex"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div
              className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer"
              onClick={toggleMenu}
            >
              <SlBadge />
              Arriendalo Flex
            </div>
          </NavLink>
          <NavLink
            to="/ayuda"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div
              className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer"
              onClick={toggleMenu}
            >
               Ayuda
            </div>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default NavBar
