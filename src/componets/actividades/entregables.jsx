import React, { useState, useEffect, useRef } from "react";
import FilePickerButton from "./filePicker";
import axios from "axios";
//! esto todavia no se puede usar
// import MicrosoftLogin from "./MicrosoftLogin";
import logo from "../../assets/img/icon.png"

const Entregables = (props) => {
  const [token, setToken] = useState(false);
  const [info, setInfo] = useState({});
  const spinValue = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    if (isLoading) {
      const spinAnimation = setInterval(() => {
        spinValue.current = (spinValue.current + 1) % 360;
      }, 16);
      return () => clearInterval(spinAnimation);
    }
  }, [isLoading]);

  const openModal = () => {
    setModalVisible(true);
    setInfo({});
  };

  const closeModal = () => {
    setInfo({});
    props.setUri("");
    setModalVisible(false);
  };

  const handlerInfo = (value) => {
    setInfo({
      ...info,
      ...value,
    });
  };

  const deleteInfo = (value) => {
    const newInfo = { ...info };
    delete newInfo[value];
    setInfo(newInfo);
  };

  const update = () => {
    setUpdates(!updates);
  };

  const sendInfoToBack = async () => {
    try {
      if (Object.keys(info).length <= 0) {
        console.log("Por favor seleccione al menos un archivo");
        return;
      }

      setIsLoading(true);

      const user_name = 'nombreUsuario'; // Obtén el nombre de usuario de donde corresponda
      const email = 'correo@example.com'; // Obtén el correo electrónico de donde corresponda

      const formatDate = new Date().toISOString().split('T');
      const finalDate = `${formatDate[0]} ${formatDate[1].split('.')[0]}`;

      const ActualizarEntregable = {
        SKU_Proyecto: 'SKU123', // Reemplaza con el valor adecuado
        nitCliente: '123456', // Reemplaza con el valor adecuado
        idNodoProyecto: 'proyecto123', // Reemplaza con el valor adecuado
        DocumentoEmpleado: 'doc123', // Reemplaza con el valor adecuado
        Fecha: finalDate,
        idProceso: 'Codi_parteA', // Reemplaza con el valor adecuado
      };

      const formData = new FormData();
      formData.append('tipo', 'entregable');
      formData.append('user', user_name);
      formData.append('ActualizarEntregable', JSON.stringify(ActualizarEntregable));

      Object.entries(info).forEach(([key, value]) => {
        const extension = value.uri.split('.').pop().toLowerCase();
        const contentTypeMap = {
          pdf: 'application/pdf',
          docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          png: 'image/png',
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          txt: 'text/plain',
        };
        const type = contentTypeMap[extension] || 'application/octet-stream';
        const currentDate = new Date().getTime();
        const formatKey = key.split(' ').join('_');
        const name = `${formatKey}${currentDate}.${extension}`;

        formData.append(key, {
          uri: value.uri,
          type: type,
          name: `${value.Numero}-${name}`,
        });
      });

      const response = await axios.post('https://tu-api.com/endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);

      setInfo({});
      setModalVisible(false)
      setIsLoading(false);

      console.log('Envío de archivos completado');
    } catch (error) {
      console.error('Error al enviar el objeto:', error);
    }
  };

  const validate = async () => {
    try {
      const formattedList = await Promise.all(
        props.lista.map(async (entregable) => {
          console.log("mapeo de lista?", entregable)

          //! corregir la ruta
          const response = await axios.get(`/proyect/entregables?SKU_Proyecto=${props.SKU_Proyecto}&NitCliente=${props.nitCliente}&idNodoProyecto=${props.idNodoProyecto}&NumeroEntregable=${entregable.Numero}&idProceso=${entregable.id_proceso}`);
          console.log(response.data);
          return { ...entregable, subido: response.data };
        })
        );
        
      const isComplete = formattedList.some(entregable => !entregable.subido);
      setNewList(formattedList);

      if (isComplete) {
        console.log('No todos los entregables han sido subidos.');
      } else {
        console.log('Todos los entregables han sido subidos correctamente.');
      }
    } catch (error) {
      console.error('Error al validar los entregables:', error);
    }
  };

  useEffect(() => {
    const createList =() => {
      validate()
    };
       createList();
    }, [props.lista, props.SKU_Proyecto, props.nitCliente, props.idNodoProyecto, modalVisible]);


  return (
    <div>
      <button
        className={`${
          props.entrega ? "bg-indigo-300" : "bg-gray-400"
        } p-2 rounded ${
          props.entrega ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        disabled={!props.entrega}
        onClick={openModal}
      >
        ...
      </button>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-azulCreame text-white p-8 rounded-xl w-9/10 md:w-1/2">
            <p className="text-lg font-bold mb-4 text-center">ENTREGABLES A ENVIAR:</p>
            {newList.map((ent, index) => (
              <div className="flex items-center mb-2" key={index}>
                <FilePickerButton
                  ent={ent.Nom_Entregable}
                  numero={ent.Numero}
                  justUploaded={ent.subido}
                  handlerInfo={handlerInfo}
                  deleteInfo={deleteInfo}
                />
              </div>
            ))}
            {props.uri && (
              <div className="flex items-center">
                <FilePickerButton
                  ent={"DOCUMENTO ADICIONAL"}
                  upLoaded={props.uri}
                  setUri={props.setUri}
                  handlerInfo={handlerInfo}
                  deleteInfo={deleteInfo}
                />
              </div>
            )}
            {!token ? (
              <div className="flex justify-between mt-4">
                {/* //! todavia no se usa
                <MicrosoftLogin update={update} /> */}
                <button
                  className="bg-red-400 p-2 rounded cursor-pointer"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="flex justify-between mt-4">
                <button
                  className="bg-white text-blue-700 p-2 rounded cursor-pointer"
                  onClick={sendInfoToBack}
                >
                  Enviar
                </button>
                <button
                  className="bg-red-400 p-2 rounded cursor-pointer"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <img
                  src={logo}
                  alt="loading-logo"
                  className="w-24 h-24 transform rotate-"
                  style={{
                    transform: `rotate(${spinValue.current}deg)`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Entregables;