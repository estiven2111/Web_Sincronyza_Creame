/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Icon from "react-fontawesome"; // Asegúrate de tener esta biblioteca de iconos instalada
import jwtDecode from "jwt-decode";
import axios from "axios";

import { ThemeContext } from "../context/themeContext";

const Logout = () => {
  const { resetInputValue, globalSearch } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    resetInputValue();
    globalSearch("");
    try {
      localStorage.removeItem("token");
      const email = localStorage.getItem("email");
      console.log(email, "hola") 
      await axios.get(`/proyect/logout?email=${email}`);
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("doc_empleado");
      navigate("/"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTimestamp = Date.now();
        if (decodedToken.exp && currentTimestamp >= Number(decodedToken.exp * 1000)) {
          handleLogout();
        }
      }
    };

    checkTokenExpiration();
  }, []);

  return (
    <button onClick={handleLogout}>
      {/* <Icon name="sign-out" size="2x" style={{ marginRight: "10px" }} /> */}
      boton
    </button>
  );
};

export default Logout;