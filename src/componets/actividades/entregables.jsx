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
      setIsLoading(true);
      
      // ... (resto del código para enviar información a la API)
      
      setIsLoading(false);
      setModalVisible(false);

      // ... (resto del código)
    } catch (error) {
      console.log("Error al enviar el objeto:", error);
    }
  };

  return (
    <div>
      <button
        className={`${
          props.entrega ? "bg-blue-500" : "bg-gray-400"
        } p-2 rounded ${
          props.entrega ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        disabled={!props.entrega}
        onClick={openModal}
      >
        ...
      </button>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-blue-700 text-white p-8 rounded">
            <p className="text-lg font-bold mb-4">ENTREGABLES A ENVIAR:</p>
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
                  className="bg-gray-300 p-2 rounded cursor-pointer"
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
                  className="bg-gray-300 p-2 rounded cursor-pointer"
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