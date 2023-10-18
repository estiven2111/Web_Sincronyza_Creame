import React from "react";
import Checklist from "./checkList";
// import SearchBar from "../../searchBar"; //! ya no se usara aqui
import LogoSync from "../../assets/img/icon.png";

const Actividades = () => {
  return (
    <div className="container mx-auto mt-4 p-4 ">
      <Checklist />
      <div className="flex items-center justify-end p-2 bg-white absolute right-0 bottom-0">
        <span className="text-sm">Powered by: </span>
        <img src={LogoSync} alt="LogoSync" className="h-8 w-20 object-contain" />
      </div>
    </div>
  );
};

export default Actividades;