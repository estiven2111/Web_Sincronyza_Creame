import React, { useEffect, useState, useContext } from 'react';
// import PieComp from './pie';
// import RangeDatePicker from './datePicker';
import LogoSync from "../../assets/img/icon.png";
import { ThemeContext} from "../context/themeContext"
import axios from 'axios';

const Indicadores = () => {
  const [name, setName] = useState("");
  const { fechasIndicadores, inputValue, todasLasFechas } = useContext(ThemeContext);
  const docId =  localStorage.getItem("doc_empleado")
  useEffect(() => {
    const getName = async () => {
      const fullname = localStorage.getItem("name")
      setName(fullname)
    };
    getName();
  },[])
  const [showGraph, setShowGraph,] = useState(false);

  const showGraphHandler = ()=> {
    setShowGraph(true)
    console.log(data.activity)
  }

  const [data, setData] = useState({
    hDisp : "",
    hProg : "",
    hCump : "",
    hFrec : "",
  })

  const handleOnChange = (text, name) => {
    setData({
    ...data,
    [name]: text
    });
  };
  
  const [justSelected, SetJustSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [totalFechas, setTotlaFechas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [infoFecha, setInfoFecha] = useState({});
  const [horasDisp, setHorasDisp] = useState({});

  const aTiempo = ((infoFecha.CumplidasPeriodo/infoFecha.HoraProgramada)*100).toFixed(1)
  const cRetraso = ((infoFecha.atrazo/infoFecha.HoraProgramada)*100).toFixed(1)
  const pFrec = ((infoFecha.HorasFrecuencia/infoFecha.HoraProgramada)*100).toFixed(1)

  const calculoActividad = () => {

    ((parseInt(data.hCump) + parseInt(data.hFrec)) / parseInt(data.hProg) * 100).toFixed(1)
  }
  
  useEffect(() => {
    const fechasSinProyectos = async() => {
      const indicadores = await axios.get(`/indicadores/fechas?docId=${docId}`);
      todasLasFechas(indicadores.data)
    }
    fechasSinProyectos()
  }, [])
  useEffect(() => {
    setIsOpen(false);
    SetJustSelected(false)
    setInfoFecha({})
    setHorasDisp({})
  },[inputValue])

  useEffect(() => {
    const ActulizarOptions = () => {
      console.log("aqui las fechas", horasDisp)
      if (fechasIndicadores){
      setTotlaFechas(fechasIndicadores.fechas)
      setHorasDisp(fechasIndicadores.HDisponibles)
      }
    }
    ActulizarOptions()
    },[fechasIndicadores])

  const toggleDropdown = () => {
    SetJustSelected(false)
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = async(option) => {
    {console.log(option, "************************************* se selecciono una opcion carguen todo!!!!!")}
    const infoFechas = await axios.get(`/indicadores/horas?docId=${docId._j}&id=${option[0].id}`)
    if (!selectedOptions.includes(option)) {
      setSelectedOptions(option);
      setInfoFecha(infoFechas.data)
      }
      console.log(docId._j, "este es el id", option[0].id, infoFechas.data)
    setIsOpen(false);
    SetJustSelected(true)
  };

  const renderOptions = () => {
    if (totalFechas) {
      return totalFechas.map((option, index) => (
        <div
          className="mb-2 cursor-pointer"
          style={{ backgroundColor: "blue" }}
          key={index}
          onClick={() => {
            handleOptionSelect([option]);
            // setCurrentID(option.id)
          }}
        >
          <p className={`truncate ${numberOfLines ? 'truncate-1' : 'truncate-2'}`}>{option.Fecha}</p>
        </div>
      ));
    }
  };
  

  const renderSelectedOptions = () => {
    return selectedOptions.map((option, index) => (
      <p key={index} className="text-blue-500 font-semibold">
        {option.Fecha}
      </p>
    ));
  };
  
  const [numberOfLines, setNumberOfLines] = useState(true);
    const handlePress = () => {
        setNumberOfLines(!numberOfLines);
    };

    return (
      <div className="container pt-48">
        <div className="scroll">
          {/* <RangeDatePicker/> */}
          
          <div className="singleInput">
            <div className="inputContOptions">
              <div className="inputIntLeftDrop">
                {justSelected ? (
                  <div className="block">
                    <button onClick={toggleDropdown}>{renderSelectedOptions()}</button>
                  </div>
                ) : (
                  <div className="blockNoSelected">
                    <button onClick={toggleDropdown}>Seleccionar opciones</button>
                  </div>
                )}
              </div>
              {isOpen && <div className="options">{renderOptions()}</div>}
            </div>
          </div>
    
          <div className="inputCont">
            <label className="label">Horas Disp.:</label>
            <input className="input" value={isNaN(horasDisp) ? "" : horasDisp.toString()} onChange={(e) => handleOnChange(e.target.value, "hDisp")} placeholder="Horas" type="number"/>
            <label className="label">Horas Cumplidas:</label>
            <input className="input" value={!isNaN(infoFecha.CumplidasPeriodo) && !isNaN(infoFecha.atrazo) ? (infoFecha.CumplidasPeriodo + infoFecha.atrazo).toString() : ""} onChange={(e) => handleOnChange(e.target.value, "hCump")} placeholder="Horas" type="number"/>
            {console.log(infoFecha.CumplidasPeriodo + infoFecha.atrazo, "hola!!!")}
          </div>
          <div className="inputCont">
            <label className="label">Horas Prog.:</label>
            <input className="input" value={!isNaN(infoFecha.HoraProgramada) ? infoFecha.HoraProgramada.toString() : ""} onChange={(e) => handleOnChange(e.target.value, "hProg")} placeholder="Horas" type="number"/>
            <label className="label">Horas Frecuencia:</label>
            <input className="input" value={!isNaN(infoFecha.HorasFrecuencia) ? infoFecha.HorasFrecuencia.toString() : ""} onChange={(e) => handleOnChange(e.target.value, "hFrec")} placeholder="Horas" type="number"/>
          </div>
          <div className="inputCont">
            <label className="label2">NIVEL DE ACTIVIDAD(%):</label>
            <input className="input" value={infoFecha.nivActividad ? infoFecha.nivActividad.toString() : ""} onChange={(e) => handleOnChange(e.target.value, "activity")} placeholder="%" type="number"/>
          </div>
          <div className="grafico">
            <div>
              {!isNaN(aTiempo) && !isNaN(cRetraso) && !isNaN(pFrec)
              ? (<>
              <div>
                <span className="name">{name}</span>
              </div>
              <PieComp aTiempo={parseFloat(aTiempo)} cRetraso={parseFloat(cRetraso)} pFrec={parseFloat(pFrec)}/></>) 
              : null}
            </div>
          </div>
        </div>
      </div>
    );
    
};

export default Indicadores;
