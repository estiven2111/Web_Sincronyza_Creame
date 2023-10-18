import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Time = ({ entrega, postInfo, isTime, setChecked }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [manualDuration, setManualDuration] = useState(false);
  const [newDuration, setNewDuration] = useState('');
  const [editedTime, setEditedTime] = useState(false);

  const handleNewDuration = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    let formattedValue = '';
    if (numericValue.length > 0) {
      formattedValue = numericValue.replace(/(\d{2})(\d{0,2})/, '$1:$2');
    }
    const isValidTime = /^([0-1][0-9]|2[0-3])(?::([0-5][0-9]?){0,2})?$/.test(formattedValue);
    if (formattedValue.length > 2) {
      setNewDuration(isValidTime ? formattedValue : null);
    } else {
      setNewDuration(formattedValue);
    }
  };

  const getDuration = () => {
    if (startTime.length === 5 && endTime.length === 5) {
      const start = startTime.split(':');
      const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);

      const end = endTime.split(':');
      const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
      let totalMinutes = 0;
      if (endMinutes >= startMinutes) {
        totalMinutes = endMinutes - startMinutes;
      } else {
        totalMinutes = 24 * 60 + (endMinutes - startMinutes);
      }
      const duration = `${Math.floor(totalMinutes / 60) < 10 ? '0' + Math.floor(totalMinutes / 60) : Math.floor(totalMinutes / 60)}:${totalMinutes % 60 < 10 ? '0' + totalMinutes % 60 : totalMinutes % 60}`;
      return duration;
    } else {
      return '';
    }
  };

  const [errorModal, setErrorModal] = useState(false);
  const toggleOverlay = () => {
    setErrorModal(!errorModal);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    if (startTime.length === 0 && endTime.length === 0) {
      if (editedTime) {
        sendInfoDB();
        setNewDuration('');
        setModalVisible(false);
        setEditedTime(false);
        return;
      } else {
        return setModalVisible(false);
      }
    }
    if (startTime.length === 5 && endTime.length === 5) {
      sendInfoDB();
      setStartTime('');
      setEndTime('');
      setModalVisible(false);
    } else {
      toggleOverlay();
    }
  };

  const [date, setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formatDate = currentDate.toISOString().split('T')[0].split('-').join('');
    setDate(formatDate);
  }, []);

  const [totalTime, setTotalTime] = useState('');

  useEffect(() => {
    const solicitud = async () => {
      try {
        const response = await axios.get(`/proyect/hours?idNodoActividad=${postInfo.idNodoActividad}&idNodoProyecto=${postInfo.idNodoProyecto}`);
        setTotalTime(response.data);
        isTime(response.data);
        setChecked(false);
      } catch (error) {
        console.error('No se envió la información correctamente', error);
      }
    };
    solicitud();
  }, [postInfo.idNodoActividad, postInfo.idNodoProyecto]);

  const sendInfoDB = async () => {
    try {
      const response = await axios.post('/proyect/hours', {
        ...postInfo,
        FechaRegistro: date,
        FechaInicio: `${date} ${startTime ? startTime + ':00' : '00:00:00'}`,
        FechaFinal: `${date} ${startTime ? endTime + ':00' : '00:00:00'}`,
        DuracionHoras: editedTime ? newDuration.split(':').join('.') : getDuration().split(':').join('.'),
        finished: false,
      });
      isTime(response.data.horaTotal);
      setTotalTime(response.data.horaTotal);
    } catch (error) {
      console.error('No se envió la información correctamente', error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button className={`btn btn-blue ${entrega ? '' : 'btn-disabled'}`} onClick={openModal}>
        {!isNaN(totalTime) ? totalTime : '00:00'}
      </button>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p className="text-white">Fecha: {date}</p>
            <div className="flex items-center justify-between w-60 my-2">
              <label className="text-white">Hora inicio:</label>
              <input
                type="time"
                className="input input-bordered w-24"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between w-60 my-2">
              <label className="text-white">Hora final:</label>
              <input
                type="time"
                className="input input-bordered w-24"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            {manualDuration ? (
              <div className="flex items-center w-60 my-2">
                <label className="text-white">Duración:</label>
                <input
                  type="text"
                  className="input input-bordered w-24"
                  maxLength="5"
                  placeholder="00:00"
                  value={newDuration}
                  onChange={(e) => handleNewDuration(e.target.value)}
                />
                <button className="btn btn-primary btn-sm mx-2" onClick={() => { setEditedTime(true); setManualDuration(false); }}>
                  <i className="fas fa-check"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center w-60 my-2">
                <label className="text-white">Duración:</label>
                {editedTime ? (
                  <p className="text-white">{newDuration}</p>
                ) : (
                  <p className="text-white">{getDuration() !== '' ? getDuration() : '00:00'}</p>
                )}
                <button className="btn btn-primary btn-sm mx-2" onClick={() => setManualDuration(true)}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div>
            )}
            <p className="text-white">Tiempo Total: {!isNaN(totalTime) ? totalTime : '00:00'}</p>
            <button className={`btn btn-primary mx-2 ${manualDuration ? 'btn-disabled' : ''}`} onClick={closeModal}>
              Aceptar
            </button>
            <div className={`modal ${errorModal ? 'block' : 'hidden'}`}>
              <div className="modal-content">
                <p className="text-white text-center font-bold">Formato no válido</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Time