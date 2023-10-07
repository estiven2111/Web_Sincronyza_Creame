import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import icon from "../../assets/img/icon.png"

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(false);
    const navigation = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 0);
  }, []);

  const handleGetToken = () => {
    const datatoken = localStorage.getItem("token");
    if (!datatoken) {
        // navigation("/home");
    } else {
        // navigation("/home");
    }
  };

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (e) => {
    try {
        e.preventDefault();
      console.log("object", user, password );
      const response = await axios.post("/login", { user, password });
      console.log(response)
    //   await localStorage.multiSet([
    //     ["name", response.data.userName],
    //     ["token", response.data.token],
    //     ["email", response.data.userEmail],
    //     ["doc_empleado", response.data.doc_empleado]
    //   ]);
    localStorage.setItem("name", response.data.userName)
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("email", response.data.userEmail)
    localStorage.setItem("doc_empleado", response.data.doc_empleado)
      console.log("paso", response.data.userName, response.data.token, response.data.userEmail, response.data.doc_empleado);
      setPassword("");
      navigation("/home");

      // Realiza la navegación a la siguiente pantalla
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        toggleOverlay();
      }
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="bg-gray-900 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen h-full md:pb-10">
        <a href="" className="flex items-center mb-6 text-2xl font-semibold text-white max-w-[550px]">
          <img className="" src={icon} alt="" />
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 max-w-md xl:p-0">
          <div className="p-6 space-y-4 max-width-[448px] md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Bienvenido
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">EMAIL</label>
                  <input type="email" name="email" value={user} onChange={(event)=>setUser(event.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">CONTRASEÑA</label>
                  <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}  id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
              </div>
              <div className="flex items-center justify-between">
              </div>
              <button onClick={handleLogin} className="w-full bg-indigo-300 border-white text-gray-900 bg-primary-600 hover:bg-indigo-400 transition focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar</button>
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
