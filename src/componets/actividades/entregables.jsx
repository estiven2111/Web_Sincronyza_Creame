import React, { useState, useEffect, useRef } from "react";
import FilePickerButton from "./filePicker";
import axios from "axios";
import Swal from "sweetalert";
//! esto todavia no se puede usar
// import MicrosoftLogin from "./MicrosoftLogin";
import logo from "../../assets/img/icon.png";
import LoginMicrosoft from "../authentication/loginmicrosfot";

const Entregables = (props) => {
  const [token, setToken] = useState(false);
  const [info, setInfo] = useState({});
  const spinValue = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newList, setNewList] = useState([]);
  const [data, setData] = useState({});
  const [validates, setValidates] = useState(false);
  let hasLogicExecuted = false;
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
    console.log(
      "voy a cambiar el valor de info ahora!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      value
    );
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

  const sendData = async (data) => {
    setIsLoading(true);

    const user_name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    const formatDate = new Date().toISOString().split("T");
    const finalDate = `${formatDate[0]} ${formatDate[1].split(".")[0]}`;

    const ActualizarEntregable = {
      SKU_Proyecto: props.SKU_Proyecto,
      nitCliente: props.nitCliente,
      idNodoProyecto: props.idNodoProyecto,
      DocumentoEmpleado: props.DocumentoEmpleado,
      Fecha: finalDate,
      idProceso: props.Codi_parteA,
    };

    const formData = new FormData();
    formData.append("token", data.tokenSecret);
    formData.append("tipo", "entregable");
    formData.append("user", user_name);
    formData.append(
      "ActualizarEntregable",
      JSON.stringify({ ...ActualizarEntregable })
    );
    console.log(
      info,
      "infossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    );
    console.log("estoy dentro del ifffffff");
    Object.entries(info).forEach(([key, value]) => {
      console.log(value, "esta es el value del foreach de value");
      const extension = value.uri.name.split(".").pop().toLowerCase();
      const contentTypeMap = {
        pdf: "application/pdf",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        txt: "text/plain",
      };
      const type = contentTypeMap[extension] || "application/octet-stream";
      const currentDate = new Date().getTime();
      const formatKey = key.split(" ").join("_");
      const name = `${formatKey}${currentDate}.${extension}`;
      console.log(`${value.Numero}-${name}`, "nombre de la imagennnn");
      // formData.append(key, value.file);
      console.log(value.uri, "imageeeeeeeeenansnassssssssssssssssssssss");
      const nombre_img = `${value.Numero}-${name}`;
      formData.append(key, value.uri, nombre_img);
      // formData.append(key, {
      //   uri: value.uri,
      //   type: type,
      //   name: nombre_img,
      // });
    });

    const response = await axios.post("/creame-dashboard", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setValidates(true);
    console.log("Respuesta del servidor:", response.data);

    setInfo({});
    setModalVisible(false);
    setIsLoading(false);

    console.log("Envío de archivos completado");
    if (response.data === "archivos enviados correctamente") {
      Swal({
        title: "ENVIO CORRECTO",
        text: "Archivos enviados correctamente",
        icon: "success",
        buttons: "Aceptar",
      });
    }
  };
  const sendInfoToBack = async () => {
    try {
      console.log(info, "******************************************");

      LoginMicrosoft()
        .then((data) => {
          // Maneja los datos recibidos aquí
          console.log("Datos recibidos:", data);
          if (data) {
            sendData(data);
          }
        })
        .catch((error) => {
          // Maneja los errores aquí
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error al enviar el objeto:", error);
    }
  };

  const validate = async () => {
    try {
      const formattedList = await Promise.all(
        props.lista.map(async (entregable) => {
          console.log("mapeo de lista?", entregable);

          //! corregir la ruta
          const response = await axios.get(
            `/proyect/entregables?SKU_Proyecto=${props.SKU_Proyecto}&NitCliente=${props.nitCliente}&idNodoProyecto=${props.idNodoProyecto}&NumeroEntregable=${entregable.Numero}&idProceso=${entregable.id_proceso}`
          );
          console.log(response.data);
          return { ...entregable, subido: response.data };
        })
      );

      const isComplete = formattedList.some((entregable) => !entregable.subido);
      setNewList(formattedList);

      if (isComplete) {
        console.log("No todos los entregables han sido subidos.");
      } else {
        console.log("Todos los entregables han sido subidos correctamente.");
      }
    } catch (error) {
      console.error("Error al validar los entregables:", error);
    }
  };

  useEffect(() => {
    const createList = () => {
      validate();
    };
    createList();
  }, [
    props.lista,
    props.SKU_Proyecto,
    props.nitCliente,
    props.idNodoProyecto,
    modalVisible,
  ]);

  return (
    <div>
      <button
        className={`${
          props.entrega ? "bg-naranjaCreame" : "bg-grayCreame"
        } p-2 rounded ${
          props.entrega ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        disabled={!props.entrega}
        onClick={openModal}
      >
        ...
      </button>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="bg-azulCreame text-white p-8 rounded-xl w-9/10 md:w-1/2 mt-36">
            <p className="text-lg font-bold mb-4 text-center">
              ENTREGABLES A ENVIAR:
            </p>
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
            {/* {isLoading && (
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
            )} */}
            {isLoading ? (
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
                <div className="loader"></div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Entregables;
