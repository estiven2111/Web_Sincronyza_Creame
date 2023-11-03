import React, { useEffect } from "react";
import Checklist from "./checkList";
// import SearchBar from "../../searchBar"; //! ya no se usara aqui
import LogoSync from "../../assets/img/icon.png";
import axios from "axios"

const Actividades = () => {

  useEffect(()=>{
    const constulta = async() => {
      if (localStorage.getItem("email")) {
        const nomproyecto = await axios.get(`/proyect/nomProyect?email=${localStorage.getItem("email")}`)
        console.log(nomproyecto.data)
      }
    }
    constulta()
  },[])

  return (
    <div className="md:px-24 p-2 xl:px-40 min-h-screen">
      <Checklist />
    </div>
  );
};

export default Actividades;