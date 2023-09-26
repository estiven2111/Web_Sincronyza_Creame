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

  const handleGetToken = async () => {
    const datatoken = await localStorage.getItem("token");
    if (!datatoken) {
        // navigation.navigate("/login");
    } else {
        // navigation.navigate("/home");
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
    await localStorage.setItem("name", response.data.userName)
    await localStorage.setItem("token", response.data.token)
    await localStorage.setItem("email", response.data.userEmail)
    await localStorage.setItem("doc_empleado", response.data.doc_empleado)
      console.log("paso");
      setPassword("");
      navigation.navigate("/home");

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
    <div className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
            Flowbite    
        </a> */}
      <a href="" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
         <img className="mr-2" src={icon} alt="" />
         </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Ingrese Usuario y Contraseña
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EMAIL</label>
                        <input type="email" name="email" value={user} onChange={(event)=>setUser(event.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CONTRASEÑA</label>
                        <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}  id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme</label>
                            </div>
                        </div> */}
                        {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                    </div>
                    <button onClick={handleLogin} className="w-full border-white text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar</button>
                    {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p> */}
                </form>
            </div>
        </div>
    </div>

  </div>
  );
// return (
//     <div>
//         <h1>hola</h1>
//     </div>
// )
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#fff",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     logoCreame: {
//       width: "400"
//     },
//     titulo: {
//       fontSize: 30,
//     },
//     inputContainer: {
//       width: "80%",
//       flexDirection: 'row',
//       alignItems: 'center',
//       borderColor: '#ccc',
//       marginBottom: 10,
//       backgroundColor: "lightgray",
//       borderRadius: 10,
//     },
//     input: {
//       width: "80%",
//       padding: 3,
//       margin: 8,
//     },
//     icon: {
//       paddingHorizontal: 10,
//     },
//     modal: {
//       width: 250,
//       height: 130,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     button: {
//       padding: 20
//     },
//     errorMesage: {
//       textAlign: "center",
//       fontSize: 16,
//       fontWeight: "bold"
//     },
//     footer: {
//       position: 'absolute',
//       flexDirection: "row",
//       alignItems: "center",
//       bottom: 0
//     }
//   });

export default Login;
