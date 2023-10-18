import { ThemeContext } from '../context/themeContext';
import React, { useState, useEffect, useContext } from 'react';
import Tarea from './tarea';
import axios from 'axios';

const Checklist = () => {
  const [response, setResponse] = useState([]);
  const { inputValue, setProjectData, todosAnticipos, todasLasFechas } = useContext(ThemeContext);
  console.log("van los valores",inputValue,"2", setProjectData,"3", todosAnticipos,"4", todasLasFechas)
  const [doc, setDoc] = useState('');
  const [name, setName] = useState('');
  const [finishedUpdate, setFinishedUpdate] = useState(false);

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
          console.log('indicadores****************************', indicadores.data);
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

  return (
    <div className="container mx-auto p-10">
      {response?.map((pro, index) => (
        <div key={index} className="mb-10 border p-5 rounded">
          {pro.componentes.map((compo, index) => (
            <div key={index} className="mb-8">
              {compo.actividades.length === 0 ? null : (
                <>
                  <div className="flex items-center mb-2">
                    <span className="mr-3 text-lg">{compo.fecha}</span>
                    <button onClick={handlePress} className="text-blue-500 underline">
                      {compo.componente}
                    </button>
                  </div>
                  {compo.actividades.map((act, ind) => (
                    <div key={ind} className="bg-white mb-5 p-3 rounded">
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
      ))}
    </div>
  );
};

export default Checklist;
