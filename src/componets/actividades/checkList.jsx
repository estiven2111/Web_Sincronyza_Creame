import { ThemeContext } from '../context/themeContext';
import React, { useState, useEffect, useContext } from 'react';
import Tarea from './tarea';
import axios from 'axios';

const Checklist = () => {
  const [response, setResponse] = useState([]);
  const { inputValue, finalValue, globalSearch, globalOptions, showOptions, setProjectData, todosAnticipos, todasLasFechas } = useContext(ThemeContext);
  const [doc, setDoc] = useState('');
  const [name, setName] = useState('');
  const [finishedUpdate, setFinishedUpdate] = useState(false);

  const [indice, setIndice] = useState(false)
  const [proyectos, setProyectos] = useState([])

  useEffect(()=>{
    const constulta = async() => {
      if (localStorage.getItem("email")) {
        const nomproyecto = await axios.get(`/proyect/nomProyect?email=${localStorage.getItem("email")}`)
        setIndice(true)
        setProyectos(nomproyecto.data)
        console.log(nomproyecto.data)
      }
    }
    constulta()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputValue !== '') {
          const user_name = localStorage.getItem('name');
          setName(user_name.toString());
          const docEmpleado = localStorage.getItem('doc_empleado');
          setDoc(docEmpleado.toString());
          const email = localStorage.getItem('email');
          const response = await axios.get(`/proyect?search=${inputValue}&email=${email}`);
          const anticipo = await axios.post(`/proyect/anticipo`, { sku: response.data[0].skuP, doc: docEmpleado });
          const indicadores = await axios.get(`/indicadores/fechas?docId=${docEmpleado}`);
          setIndice(false)
          todosAnticipos(anticipo.data);
          todasLasFechas(indicadores.data);
          setProjectData({
            //! aquí se agregarían más datos
            SKU_Proyecto: response.data[0].skuP || '',
            NitCliente: response.data[0].nitCliente || '',
            idNodoProyecto: response.data[0].idNodoP || '',
            idProceso: response.data[0].Codi_parteP || '',
          });
          setResponse(response?.data);
          setFinishedUpdate(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [inputValue, finishedUpdate]);

  const [numberOfLines, setNumberOfLines] = useState(true);
  const handlePress = () => {
    setNumberOfLines(!numberOfLines);
  };

  const handleSelect = async (e) => {
    console.log("holaaaaa!!", e.target.innerText)
    await globalSearch(e.target.innerText)
    await finalValue(e.target.innerText)
    console.log(showOptions, "**********")
    setTimeout(() => {
      globalOptions(false);
    }, 3000);
  }

  return (
    <div className="">
      {indice
      ?<div className='pt-4'>
        <p className='py-4'>
          indice de proyectos
        </p>
        <ol className='list-decimal pl-6'>
          {proyectos.map((proyecto, index)=>
            <li className='p-2'>
              <div onClick={handleSelect} key={index} className='cursor-pointer'>
                  {proyecto}
              </div>
            </li>
          )}
        </ol>
      </div>
      :response?.map((pro, index) => (
        <div key={index} className="">
          {pro.componentes.map((compo, index) => (
            <div key={index} className="mb-5 bg-lightBlueCreame p-3 rounded-lg">
              {compo.actividades.length === 0 ? null : (
                <>
                  <div className="flex items-center mb-2">
                  <p className="mr-3 text-xs sm:text-base break-normal min-w-fit">{compo.fecha}</p>
                    <p onClick={handlePress}  className={`text-black ${numberOfLines ? 'truncate' : ''} text-black cursor-pointer text-xs sm:text-base no-underline`}>
                      {compo.componente}
                    </p>
                  </div>
                  {compo.actividades.map((act, ind) => (
                    <div key={ind} className="bg-white mb-5 p-1 rounded">
                      <Tarea
                        proyecto={pro.proyecto}
                        skuP={pro.skuP}
                        componente={compo.componente}
                        nitCliente={pro.nitCliente}
                        documentoEmpleado={doc}
                        idNodoProyecto={pro.idNodoP}
                        idNodoActividad={act.idNodoA}
                        Cod_Parte={act.Codi_parteA}
                        actividad={act.actividad}
                        entregable={act.entregable}
                        listaEntregable={act.nombre_entregable}
                        finishedUpdate={(value) => setFinishedUpdate(value)}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      ))
      }
    </div>
  );
};

export default Checklist;
