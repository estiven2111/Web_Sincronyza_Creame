import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import icon from "../../assets/img/icon.png"
import swal from "sweetalert";
import { useDispatch,useSelector } from "react-redux";
import { loginredux } from "../redux/reducer/login.slice";
const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(false);
    const navigation = useNavigate();
    const {date_login} = useSelector((state) => state.loginSlice)
    const dispatch = useDispatch()

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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("object", user, password );
    const response = await dispatch(loginredux(user, password ))
   localStorage.setItem("name", response.userName)
   localStorage.setItem("token", response.token)
   localStorage.setItem("email", response.userEmail)
   localStorage.setItem("doc_empleado", response.doc_empleado)
    setPassword("");
    navigation("/home");
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