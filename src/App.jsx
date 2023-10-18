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
import Gastos from "./componets/gastos/gastos";
import Actividades from "./componets/actividades/actividades";

import Home from "./componets/home/home"


function App() {
  const location = useLocation()
  return (
    <ThemeProvider>
      <div className='w-full min-h-screen'  >
        {location.pathname === "/" ? <Login /> :<NavBar/>}
          <Routes>
             <Route path='/Gastos' element= {<Gastos/>} />
             <Route path='/actividades' element= {<Actividades/>} />
           {/* <Route path='/about' element={<About/>} />
            <Route path='/detail/:detailId' element={<Detail/>} />
            <Route path="favorites" element={<Favorites onClose={onClose} />}/> */}
          </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
