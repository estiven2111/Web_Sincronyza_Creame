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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
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
    <div className=" bg-azulCreame p-5  z-20 fixed top-0 left-0 w-full">
      <div className="">
        <div className="">
          <div className="flex w-full justify-between items-center">
            <div className="">
                <Link to="/" >
                  <img
                    className="w-40 md:w-60"
                    src={icon}
                    alt="logo"
                  />
                </Link>
            </div>
            
            <div className="flex flex-row md:w-full text-white">
              <div className="flex md:hidden text-right items-center">
                <WelcomeBar/>
              </div>
              <button className={`md:hidden block text-white text-xl transition-transform duration-200 ease-in-out focus:outline-none ${showMenu ? "rotate-90" : "rotate-0"}`} onClick={toggleMenu}>
                {showMenu ? (
                  <VscChromeClose className="text-3xl" />
                ) : (
                  <IoMenuSharp className="text-4xl" />
                )}
              </button>
              <div className="hidden gap-5 md:flex md:col-span-2">
                <NavLink to="/actividades" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  <div className="cursor-pointer  hover:scale-105 duration-200 px-5">
                    Actividades
                  </div>
                </NavLink>
                <NavLink to="/Gastos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  <div className="cursor-pointer  hover:scale-105 duration-200  px-5">
                   Gastos
                  </div>
                </NavLink>
                <NavLink to="/indicadores" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  <div className="cursor-pointer  hover:scale-105 duration-200 px-5">
                  Graficas
                  </div>
                </NavLink>
              </div>
            </div>
            
            <div className="hidden md:flex lg:flex-row items-center" >
              <WelcomeBar/>
              <Logout/>
            </div>

          </div>
        </div>
      </div>

      {/* Menu content for medium and small screens */}
      {showMenu && (
        <div className={`lg:hidden bg-slate-50 py-3 px-5 mt-[0.5px] shadow-md text-black right-1 absolute w-4/5 rounded ${
            showMenu
              ? "opacity-100 max-h-full transition-all duration-200 ease-in-out"
              : "opacity-0 max-h-0"
          }`}
          style={{
            maxHeight: showMenu ? "500px" : "0",
            visibility: showMenu ? "visible" : "hidden",
          }}
        >
          <NavLink to="/actividades" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <div className="flex pl-5 mb-2 gap-3 pt-4 items-center hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
              Actividades
              <FontAwesomeIcon icon={faListCheck} />
            </div>
          </NavLink>
          <NavLink to="/Gastos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <div className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
              Gastos
              <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
            </div>
          </NavLink>
          <NavLink to="/indicadores" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <div className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
              Indicadores
              <FontAwesomeIcon icon={faChartLine} />
            </div>
          </NavLink>
          <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <div className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
              Salir
              <FontAwesomeIcon icon={faRightFromBracket}/>
            </div>
          </NavLink>
        </div>
      )}
      <SearchBar/>
    </div>
  );
}

export default NavBar
