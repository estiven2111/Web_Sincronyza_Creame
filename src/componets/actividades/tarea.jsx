import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Time from './time';
import Entregables from './entregables';


const Tarea = (props) => {
  console.log("props de tarea", props)
  const [checked, setChecked] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isTotalTime, setIsTotalTime] = useState('');
  const [finished, setFinished] = useState(false);
  const spinValue = useRef(0);

  useEffect(() => {
    setFinished(false);
  }, [props.proyecto]);

  const [readyTocheck, setReadyTocheck] = useState(false);
  const isAllReady = (value) => {
    setReadyTocheck(value);
  };

  const handleCheckboxToggle = () => {
    if (readyTocheck) {
      setConfirmModal(true);
    } else {
      alert('Por favor adjunte todos los entregables');
    }
  };

  const postInfo = {
    proyect: props.proyecto,
    component: props.componente,
    activity: props.actividad,
    SKU_Proyecto: props.skuP,
    NitCliente: props.nitCliente,
    DocumentoEmpleado: props.documentoEmpleado,
    idNodoProyecto: props.idNodoProyecto,
    idNodoActividad: props.idNodoActividad,
    Cod_Parte: props.Cod_Parte,
  };

  const confirmChecked = async () => {
    try {
      const email = localStorage.getItem('email'); // Obtener el email del almacenamiento local
      await axios.put('/proyect/update', {
        idNodoProyecto: props.idNodoActividad,
        SKU_Proyecto: props.skuP,
        finished: 1,
      });
      await axios.put('/proyect/updateProyect', {
        email: email,
        doc_id: props.documentoEmpleado,
      });
      setConfirmModal(false);
      setChecked(true);
      setFinished(true);
      props.finishedUpdate(true);
      setIsTotalTime('');
      alert('Se completó la tarea');
      setReadyTocheck(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [uri, setUri] = useState('');
  const [numberOfLines, setNumberOfLines] = useState(true);

  const handlePress = () => {
    setNumberOfLines(!numberOfLines);
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="w-3/5 pr-4 ">
        <p onClick={handlePress} className={`text-black ${numberOfLines ? 'truncate' : ''} cursor-pointer text-xs sm:text-base`}>
          {props.actividad}
        </p>
      </div>
      <div className="w-2/5 flex items-center justify-between">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            if (!isNaN(isTotalTime)) {
              handleCheckboxToggle();
            }
          }}
        />
        {confirmModal && (
          <div className="modal">
            <div className="modal-content">
              <p className="text-white">
                Después de confirmar, la actividad ya no estará disponible en su dispositivo. ¿Está seguro de haber
                enviado todos los elementos requeridos?
              </p>
              <div className="buttons">
                <button className="btn-confirm" onClick={confirmChecked}>
                  Confirmar
                </button>
                <button className="btn-cancel" onClick={() => setConfirmModal(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        <Time entrega={props.entregable} postInfo={postInfo} isTime={setIsTotalTime} setChecked={setChecked} />
        <Entregables
          entrega={props.entregable}
          lista={props.listaEntregable}
          uri={uri}
          setUri={setUri}
          SKU_Proyecto={props.skuP}
          nitCliente={props.nitCliente}
          idNodoProyecto={props.idNodoProyecto}
          DocumentoEmpleado={props.documentoEmpleado}
          Codi_parteA={props.Cod_Parte}
          finishedUpdate={props.finishedUpdate}
          isAllReady={isAllReady}
        />
        {/* //! todavia no se usa
        <Camera entrega={props.entregable} setUri={setUri} /> */}
      </div>
    </div>
  );
};

export default Tarea;
