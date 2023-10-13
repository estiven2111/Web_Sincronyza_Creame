/* eslint-disable no-unused-vars */
import { ThemeProvider } from "./componets/context/themeContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css'
import NavBar from "./componets/navigation/NavBar";
import Login from "./componets/authentication/login";
import Gastos from "./componets/screens/gastos/Gastos";

function App() {
   const url = window.location.pathname.includes("/")
   console.log(url,window.location.pathname)
  return (
    <ThemeProvider>
       <div className="container bg-slate-600">
        {/* {window.location.pathname === "/"? <NavBar />:""} */}
      <Router>
        {/* <NavBar /> */}
       <Routes>
        
       {/* <Route
          path="/"
          element={
            location.pathname === "/" ? (
              <>
                <NavBar />
              </>
            ) : (
              <Login />
            )
          }
          
        /> */}
       <Route path="/" element={<Login />}/>
       <Route path="/gastos" element={<Gastos />}/>
       </Routes>
      </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
