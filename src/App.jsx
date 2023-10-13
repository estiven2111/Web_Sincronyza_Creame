/* eslint-disable no-unused-vars */
import { ThemeProvider } from "./componets/context/themeContext";

import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./componets/navigation/NavBar";
import Login from "./componets/authentication/Login";
import Gastos from "./componets/screens/gastos/Gastos";

import Home from "./componets/home/home"


function App() {
  const location = useLocation()
  return (
    <ThemeProvider>
      <div className='bg-white container w-full '  >
        {location.pathname === "/" ? <Login /> :<NavBar/>}
          <Routes>
            <Route path='/home' element= {<Home/>} />
             <Route path='/Gastos' element= {<Gastos/>} />
           {/* <Route path='/about' element={<About/>} />
            <Route path='/detail/:detailId' element={<Detail/>} />
            <Route path="favorites" element={<Favorites onClose={onClose} />}/> */}
          </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
