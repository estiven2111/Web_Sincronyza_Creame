/* eslint-disable react/prop-types */

import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineCamera } from "react-icons/ai";
import { FiRepeat } from "react-icons/fi";
import { BiSolidSave } from "react-icons/bi";

function CameraGastos({ closeCam,imageData }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  let camera = false;
  useEffect(() => {
    camera = camera || executeCamera();
  }, []);
  const executeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const handleRepeat = () =>{
    setImageSrc(null)
    executeCamera()
  }
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !canvas.getContext) {
      console.error("Canvas no está disponible");
      return;
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/jpeg");
    setImageSrc(imageUrl);
    stopcamera();
    console.log(imageUrl);
  };

  const handlecamara = () => {
    stopcamera();
    closeCam();
  };
  const stopcamera = () => {
    const videoStream = videoRef.current.srcObject;
    if (videoStream instanceof MediaStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    videoRef.current.srcObject = null;
  };

  const handleSave = () => {
    imageData(imageSrc)
    closeCam();
    stopcamera();
    setImageSrc(null)
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center mt-56 m-6 z-50">
      <div className="bg-gray-800 bg-opacity-70  p-5 rounded-lg border-solid border-8 border-gray-50 flex flex-col justify-center items-center gap-5">
        
        <div className={`${imageSrc ? "hidden" : "w-full max-w-md"}`}>
          <video ref={videoRef} autoPlay className="w-full" />
        </div>
        <div className="w-full">
          {imageSrc && (
            <div className="w-full flex justify-center">
              <img
                className="w-full max-w-md"
                src={imageSrc}
                alt="Imagen capturada"
              />
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
        {imageSrc ? (
          <>
          <div className="flex items-center justify-center">
              <div className="mr-5 lg:mr-10 md:mr-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer  dark:hover:bg-bray-800 dark:bg-green-700 bg-green-500 hover:bg-green-700 active:bg-green-900">
                <button type="button" onClick={handleSave}><BiSolidSave  size={60}/></button>
              </div>
              <div className="ml-5 lg:ml-10 md:ml-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 bg-gray-500 hover:bg-gray-400  active:bg-slate-800">
                <button type="button" onClick={handleRepeat}><FiRepeat  size={60}/></button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <button className="" type="button" onClick={captureImage}>
       Tomar foto
      </button> */}
            <div className="flex items-center justify-center">
              <div className="mr-5 lg:mr-10 md:mr-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer  dark:hover:bg-bray-800 dark:bg-gray-700 bg-red-500 hover:bg-red-700 active:bg-red-900">
                <button type="button" onClick={captureImage}><AiOutlineCamera  size={60}/></button>
              </div>
              <div className="ml-5 lg:ml-10 md:ml-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 bg-gray-500 hover:bg-gray-400  active:bg-slate-800">
                <button type="button" onClick={handlecamara}><AiFillCloseCircle  size={60}/></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CameraGastos;
