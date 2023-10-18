import React, { useEffect, useState, useRef } from "react";
import { Input, initTE } from "tw-elements";
import Webcam from "react-webcam";
import Modalcam from "./CameraGastos";
import { AiFillCamera } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { BiScan } from "react-icons/bi";

const Gastos = () => {
  useEffect(() => {
    initTE({ Input });
  });
  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  // const [imageSrc, setImageSrc] = useState(null);
  const [opencam, setOpencam] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // const startCamera = async () => {
  //   try {
  //     setOpencam(true)
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     videoRef.current.srcObject = stream;
  //   } catch (error) {
  //     console.error("Error al acceder a la cámara:", error);
  //   }
  // };

  // const captureImage = () => {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;

  //   if (!canvas || !canvas.getContext) {
  //     console.error('Canvas no está disponible');
  //     return;
  //   }

  //   const context = canvas.getContext('2d');
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   const imageUrl = canvas.toDataURL('image/jpeg');
  //   setImageSrc(imageUrl);
  //   console.log(imageUrl);
  // };
  const openCamera = () => {
    setOpencam(!opencam);
  };
  const imageData = (uri) => {
    setImageSrc(uri);
  };

  //flex items-center justify-center
  // w-full md:w-4/5 xl:4/5

  // <video ref={videoRef} autoPlay />
  // <button onClick={captureImage}>Capturar imagen</button>
  // {imageSrc && <img src={imageSrc} alt="Imagen capturada" />}
  // <canvas ref={canvasRef} style={{ display: 'none' }} />

  // {
  //   opencam  ? (<>
  //   {console.log(opencam)}
  //   <div className="grid grid-cols-1 mx-auto  md:w-4/5 xl:4/5 bg-black h-80">
  //     <div  className=" col-span-1 flex items-center justify-center bg-slate-600 ">
  //    <div className="w-full">
  //    <video ref={videoRef} autoPlay className="w-1/2 "/>
  //    </div>

  //    <div className="w-full">
  //    {imageSrc && <img className="w-1/2" src={imageSrc} alt="Imagen capturada" />}
  //     <canvas ref={canvasRef} style={{ display: 'none' }} />
  //    </div>
  //     <button type="button" onClick={captureImage}>Capturar imagen</button>
  //    </div>
  //   </div>

  //   </>): (<>
  //     <div className="grid grid-cols-2 gap-4 mx-auto text-center h-80">
  //         <div className=" flex items-center justify-center">
  //           <div className="rounded-full flex items-center justify-center w-48 h-48  bg-neutral-600">
  //             <button type="button" onClick={startCamera}>
  //               Abrir cámara
  //             </button>
  //           </div>
  //         </div>
  //         <div className="bg-slate-300 flex items-center justify-center">
  //           {/* <input type="" className="rounded-full w-48 h-48 bg-neutral-600"/> */}

  //           <div className="flex items-center justify-center w-full">
  //             <label
  //               htmlFor="dropzone-file"
  //               className=" w-48 h-48 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
  //             >
  //               <div className="flex flex-col items-center justify-center pt-5 pb-6">
  //                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
  //                   <span className="font-semibold">
  //                     Click para cargar una imagen
  //                   </span>
  //                 </p>
  //                 <p className="text-xs text-gray-500 dark:text-gray-400">
  //                   {" "}
  //                   PNG, JPG, JPEG{" "}
  //                 </p>
  //               </div>
  //               <input id="dropzone-file" type="file" className="hidden" />
  //             </label>
  //           </div>
  //         </div>
  //       </div>
  //   </>)
  //  }
  return (
    <div className="mt-56 m-6">
      <form className="">
        {imageSrc ? (
          <>
           <div className="mx-auto text-center h-90 mb-14 ">
  <div className="bg-blue-300/50 rounded-lg grid grid-cols-1 ">
    
    <div className=" col-span-1  flex items-center justify-center mb-5">
      <img className="w-96" src={imageSrc} alt="" />
    </div>

    <div className="col-span-1 flex items-center justify-center mb-5">
      <div className="hover:bg-slate-300 w-28 h-16 flex items-center justify-center border-2 rounded-full border-gray-700 border-dashed cursor-pointer bg-gray-50 dark:hover-bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <button
          className="flex items-center justify-center w-28 h-16 rounded-full"
          type="button"
          onClick={() => {
            setImageSrc(null);
          }}
        >
          <GiCancel size={40} />
          <p>cancelar</p>
        </button>
      </div>
      <div className=" ml-5 hover:bg-slate-300 w-28 h-16 flex items-center justify-center border-2 rounded-full border-gray-700 border-dashed cursor-pointer bg-gray-50 dark:hover-bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover-bg-gray-600">
        <button
          className="flex items-center justify-center w-28 h-16 rounded-full"
          type="button"
          onClick={() => {
            console.log("enviar ocr");
          }}
        >
          <BiScan size={40} />
          <p>Scan</p>
        </button>
      </div>
    </div>
  </div>
</div>


          </>
        ) : (
          <>
            <div className="grid grid-cols-1  mx-auto text-center h-80 mb-14">
              <div className="flex items-center justify-center bg-blue-300/50 rounded-lg ">
                <div className="hover:bg-slate-300 mr-5 lg:mr-60  w-28 h-28 lg:w-48 lg:h-48 md:w-36 md:h-36 flex flex-col items-center justify-center border-2 rounded-full border-gray-700 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <button type="button" onClick={openCamera}>
                    <AiFillCamera size={90} />
                  </button>
                </div>
                <div className="w-28">
                  {" "}
                  {/* Añade margen izquierdo para separar los elementos */}
                  <label
                    htmlFor="dropzone-file"
                    className="hover:bg-slate-300  w-28 h-28 lg:w-48 lg:h-48 md:w-36 md:h-36  flex flex-col items-center justify-center border-2 rounded-full border-gray-700 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <GrGallery size={80} />
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mx-auto ">
          <div className="lg:col-span-4 col-span-2 flex items-center justify-center">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5  "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className=" bg-blue-300/50 peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="concepto"
                placeholder="Example label"
              />
              <label
                htmlFor="concepto"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Concepto
              </label>
            </div>
          </div>
          {/* NIT */}
          <div className="flex items-center justify-center col-span-1 ">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="NIT/CC"
                placeholder="Example label"
              />
              <label
                htmlFor="NIT/CC"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                NIT/CC
              </label>
            </div>
          </div>
          {/* NOMBRE */}
          <div className="flex items-center justify-center col-span-1">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="Nombre"
                placeholder="Example label"
              />
              <label
                htmlFor="Nombre"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Nombre
              </label>
            </div>
          </div>
          {/* VALOR PAGADO */}
          <div className="flex items-center justify-center col-span-1 ">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="Valor pagado"
                placeholder="Example label"
              />
              <label
                htmlFor="Valor pagado"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                $ Valor pagado
              </label>
            </div>
          </div>
          {/* IVA */}
          <div className="flex items-center justify-center col-span-1 ">
            <div
              className="relative mb-3 w-full md:w-1/2 xl:w-1/2 "
              data-te-input-wrapper-init
            >
              <input
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="Valor Iva"
                placeholder="Example label"
              />
              <label
                htmlFor="Valor Iva"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Valor Iva
              </label>
            </div>
            <div
              className="relative mb-3 w-4/5 md:w-4/12 xl:w-4/12 "
              data-te-input-wrapper-init
            >
              <input
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="$ IVA"
                placeholder="Example label"
              />
              <label
                htmlFor="$ IVA"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                $ IVA
              </label>
            </div>
          </div>
          {/* RETEFUENTE */}
          <div className="flex items-center justify-center col-span-1">
            <div
              className="relative mb-3  w-full md:w-1/2 xl:w-1/2 "
              data-te-input-wrapper-init
            >
              <input
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="Valor Rete"
                placeholder="Example label"
              />
              <label
                htmlFor="Valor Rete"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Valor Rete
              </label>
            </div>
            <div
              className="relative mb-3 w-4/5 md:w-4/12 xl:w-4/12 "
              data-te-input-wrapper-init
            >
              <input
                type="number"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="% Rete"
                placeholder="Example label"
              />
              <label
                htmlFor="% Rete"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                % Rete
              </label>
            </div>
          </div>
          {/* FECHA */}
          <div className="flex items-center justify-center col-span-1">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="Fecha"
                placeholder="Example label"
              />
              <label
                htmlFor="Fecha"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Fecha
              </label>
            </div>
          </div>
          {/* CODIGO POSTAL */}
          <div className="flex items-center justify-center col-span-1">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="CodPostal"
                placeholder="Example label"
              />
              <label
                htmlFor="CodPostal"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                CodPostal
              </label>
            </div>
          </div>
          {/* MUNICIPIO */}
          <div className="flex items-center justify-center col-span-1">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="Municipio"
                placeholder="Example label"
              />
              <label
                htmlFor="Municipio"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Municipio
              </label>
            </div>
          </div>
          {/* IPC */}
          <div className="flex items-center justify-center col-span-1 lg:col-start-2 lg:col-end-2">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="Ipc"
                placeholder="Example label"
              />
              <label
                htmlFor="Ipc"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Ipc
              </label>
            </div>
          </div>
          {/* SUBTOTAL */}
          <div className="flex items-center justify-center col-span-1 lg:col-start-3 lg:col-end-3">
            <div
              className="relative mb-3 w-full md:w-4/5 xl:4/5 "
              data-te-input-wrapper-init
            >
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="SubTotal"
                placeholder="Example label"
              />
              <label
                htmlFor="SubTotal"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                SubTotal
              </label>
            </div>
          </div>
        </div>
        <div className=" text-center">
          <button
            type="button"
            className="mt-10 inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
          >
            Enviar
          </button>
        </div>
      </form>
      {opencam && <Modalcam closeCam={openCamera} imageData={imageData} />}
    </div>
  );
};

export default Gastos;
