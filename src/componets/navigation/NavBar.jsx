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
    color: "white",
    fontWeight: "bold",
    paddingBottom: "2px",
    borderBottom: "2px solid ",
  };
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  let tokens = ["D1", "2B", "A2", "4C", "1E", "F10"]
console.log(tokens.sort()[tokens.length / 2]);
  return (
    <div className="z-20 sticky top-0 left-0 w-full">
   
      <div className="">
        <div className="">
          <div className="flex w-full justify-between items-center px-5 bg-white text-black">
            <div className="">
                <Link to="/" >
                  <img
                    className="w-40 md:w-60"
                    src={icon}
                    alt="logo"
                  />
                </Link>
            </div>
            
            <div className="flex flex-row md:w-full text-white md:hidden">
              <div className="flex md:hidden text-right items-center">
                <WelcomeBar/>
                <Logout/>
              </div>

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
                  Gráficas
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

      <div className="grid grid-cols-3 text-gray-500 px-5 py-3 bg-azulCreame">
          <NavLink to="/actividades" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
             <FontAwesomeIcon icon={faListCheck}/>
                Actividades
             </div>
           </NavLink>
           <NavLink to="/Gastos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
               <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
               Gastos
             </div>
           </NavLink>
           <NavLink to="/indicadores" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
               <FontAwesomeIcon icon={faChartLine} />
               Indicadores
             </div>
           </NavLink>
        </div>
      {/* Menu content for medium and small screens */}
      {/* {showMenu && (
        <div className="grid grid-cols-3 py-4 text-white">
          <NavLink to="/actividades" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col pl-5 gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
             <FontAwesomeIcon icon={faListCheck}/>
                Actividades
             </div>
           </NavLink>
           <NavLink to="/Gastos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col pl-5 gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
               <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
               Gastos
             </div>
           </NavLink>
           <NavLink to="/indicadores" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col pl-5 gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
               <FontAwesomeIcon icon={faChartLine} />
               Indicadores
             </div>
           </NavLink>
        </div>
        // <div className={`lg:hidden bg-slate-50 py-3 px-5 mt-[0.5px] shadow-md text-black right-1 absolute w-4/5 rounded ${
        //     showMenu
        //       ? "opacity-100 max-h-full transition-all duration-200 ease-in-out"
        //       : "opacity-0 max-h-0"
        //   }`}
        //   style={{
        //     maxHeight: showMenu ? "500px" : "0",
        //     visibility: showMenu ? "visible" : "hidden",
        //   }}
        // >
        //   <NavLink to="/actividades" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        //     <div className="flex pl-5 mb-2 gap-3 pt-4 items-center hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
        //       Actividades
        //       <FontAwesomeIcon icon={faListCheck} />
        //     </div>
        //   </NavLink>
        //   <NavLink to="/Gastos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        //     <div className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
        //       Gastos
        //       <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
        //     </div>
        //   </NavLink>
        //   <NavLink to="/indicadores" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        //     <div className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
        //       Indicadores
        //       <FontAwesomeIcon icon={faChartLine} />
        //     </div>
        //   </NavLink>
        //   <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        //     <div className="flex pl-5 gap-3 items-center mb-2 hover:text-lightblueone cursor-pointer justify-end" onClick={toggleMenu}>
        //       Salir
        //       <FontAwesomeIcon icon={faRightFromBracket}/>
        //     </div>
        //   </NavLink>
        // </div>
      )} */}
      <div className="flex justify-center">
        <SearchBar/>
      </div>
    </div>
  );
}

export default NavBar
