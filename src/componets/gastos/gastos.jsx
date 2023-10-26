import React, { useEffect, useState, useRef } from "react";
import { Input, initTE } from "tw-elements";
import Swals from "sweetalert2";
import Swal from "sweetalert";
import Webcam from "react-webcam";
import Modalcam from "./CameraGastos";
import { AiFillCamera } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { BiScan } from "react-icons/bi";
import axios from "axios";
import loading from "../../assets/img/loading.gif";
// <input type="file" capture="camera" />
let imagen = null;
let latitude = 0;
let longitude = 0;
const Gastos = () => {
  useEffect(() => {
    initTE({ Input });
  });
  const [opencam, setOpencam] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  // const fileInputRef = useRef(null);
  const [fillData, setFillData] = useState(false);
  const [responsedata, setResponsedata] = useState({
    nit: "",
    numFact: "",
    doc: "",
    total: "",
    totalSinIva: "",
    nombre: "",
    rete: "",
    retePorc: 4,
    iva: "",
    ivaPorc: 19,
    fecha: "",
    concepto: "",
    municipio: "",
    codepostal: "",
    ipc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const openCamera = () => {
    setOpencam(!opencam);
  };
  const imageData = (uri) => {
    setImageSrc(uri);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      imagen = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    }
  };

  const handlerValidation = (event) => {
    const input = event.target;
    if (input.files.length > 0) {
      const file = input.files[0];
      const Extensions = [".jpg", ".jpeg"];
      const fileExtension = file.name.slice(
        ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      if (!Extensions.includes("." + fileExtension.toLowerCase())) {
        Swal({
          title: "ARCHIVO INCORRECTO",
          text: "Debe seleccionar un archivo .JPG O JPEG",
          icon: "warning",
          buttons: "Aceptar",
        });
        // Swals.fire({
        //   title: "ARCHIVO INCORRECTO",
        //   text: "Debe seleccionar un archivo .JPG O JPEG",
        //   icon: "warning",
        //   confirmButtonText: "Aceptar",
        // });
        input.value = "";
      }
    }
  };
  const locations = () => {
    try {
      if ("geolocation" in navigator) {
        // El navegador soporta la geolocalización
        navigator.geolocation.getCurrentPosition(
          function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log("Latitud: " + latitude);
            console.log("Longitud: " + longitude);
            // Aquí puedes usar la latitud y la longitud como desees
          },
          function (error) {
            // Manejo de errores
            switch (error.code) {
              case error.PERMISSION_DENIED:
                Swal({
                  title: "UBICACION DENEGADA",
                  text: "Para poder saber el municipio y el codigo postal debe activar la geolocalización de su navegador web en configuraciones de su navegador",
                  icon: "warning",
                  buttons: "Aceptar",
                });
                break;
              case error.POSITION_UNAVAILABLE:
                Swal({
                  title: "ERROR DE UBICACION",
                  text: "Información de ubicación no disponible",
                  icon: "warning",
                  buttons: "Aceptar",
                });
                break;
              case error.TIMEOUT:
                Swal({
                  title: "ERROR DE UBICACION",
                  text: "Se agotó el tiempo para obtener la ubicación.",
                  icon: "warning",
                  buttons: "Aceptar",
                });
                break;
              default:
                console.error("Error desconocido: " + error.message);
            }
          }
        );
      } else {
        // El navegador no admite geolocalización
        Swal({
          title: "ERROR DE UBICACION",
          text: "El navegador no admite geolocalización.",
          icon: "warning",
          buttons: "Aceptar",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const peticionOcr = async () => {
    try {
      const user_name = await localStorage.getItem("name");
      setIsLoading(true);
      console.log("Latitud: " + latitude);
      console.log("Longitud: " + longitude);
      console.log(user_name);
      console.log(imagen);
      console.log(latitude, longitude);
      const formData = new FormData();
      formData.append("imagen", imagen);

      formData.append("latitud", latitude);
      formData.append("longitud", longitude);
      const response = await axios.post(`/proyect/ocr`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let municipio = "";
      let codepostal = "";
      if (
        response.data.codepostal === undefined ||
        response.data.codepostal === undefined
      ) {
        municipio = "";
        codepostal = "";
      } else {
        municipio = response.data.municipio;
        codepostal = response.data.codepostal;
      }
      const iva =
        !responsedata.ivaPorc || !responsedata.totalSinIva
          ? ""
          : `${(responsedata.totalSinIva * responsedata.ivaPorc) / 100}`;
      const rete =
        !responsedata.retePorc || !responsedata.totalSinIva
          ? ""
          : `${(responsedata.totalSinIva * responsedata.retePorc) / 100}`;
      setResponsedata({
        ...responsedata,
        nit: response.data.nit,
        numFact: response.data.numFact,
        doc: response.data.doc,
        total: response.data.total,
        totalSinIva: response.data.totalSinIva,
        nombre: user_name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        iva: iva,
        rete: rete,
        fecha: response.data.fecha,
        concepto: response.data.concepto,
        ipc: responsedata.ipc,
        municipio,
        codepostal,
      });
      setFillData(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error, "Error");
    }
  };

  const conetionMicrosoft = async () => {
  //  const validar = await axios.get(`https://syncronizabackup-production.up.railway.app/user/api/auth`)
  //  console.log(validar,"autenticarrr")
   
    const URLS =
      "https://syncronizabackup-production.up.railway.app/user/api/validation";

    const popup = window.open(`${URLS}`, "_blank", `location=none width=620 height=700 toolbar=no status=no menubar=no scrollbars=yes resizable=yes`)

    window.addEventListener('message', event => {
      if (event.origin === `https://syncronizabackup-production.up.railway.app`) {

        if (event.data) {
          console.log(event.data)
          // localStorage.setItem('token', event.data.token)

          popup.close()

        }
      }
    })

    return;
    const respon = await axios.get(
      "https://syncronizabackup-production.up.railway.app/user/api/files"
    );
    if (respon.data.token === true) {
      console.log("entro el token");
      const user_name = await localStorage.getItem("name");
      const email = await localStorage.getItem("email");
      const docEmpleado = await localStorage.getItem("doc_empleado");

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0"); // Día del mes con dos dígitos
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Mes (0 - 11) con dos dígitos
      const year = String(currentDate.getFullYear()).slice(2); // Año con dos dígitos
      const hours = String(currentDate.getHours()).padStart(2, "0"); // Hora con dos dígitos
      const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // Minutos con dos dígitos
      const formatDate = new Date().toISOString().split("T")[0];
      const nom_img = `${user_name}_${day}${month}${year}_${hours}${minutes}.jpg`;

      // const ActualizarEntregable = {
      //   ...infoProject.input,
      //   N_DocumentoEmpleado: docEmpleado,
      //   Nombre_Empleado: user_name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      //   NumeroComprobante : prepayment?prepayment.NumeroComprobante : "",//
      //   Fecha: formatDate,//
      //   FechaComprobante: responsedata.fecha?responsedata.fecha.split("/").join("-"):"", //
      //   ValorComprobante: responsedata.total?parseInt(responsedata.total):0,//
      //   NitComprobante: responsedata.nit?responsedata.nit:"",//
      //   NombreComprobante: responsedata.concepto?responsedata.concepto:"",//
      //   CiudadComprobante:responsedata.municipio?responsedata.municipio:"",//
      //   DireccionComprobante:responsedata.codepostal?responsedata.codepostal.toString():"",//
      //   CCostos : prepayment?prepayment.IdCentroCostos.toString() : "",//
      //   idAnticipo: prepayment?parseInt(prepayment.IdResponsable) : "",//
      //   ipc: responsedata.ipc?parseInt(responsedata.ipc):0,//
      //   Sub_Total : responsedata.totalSinIva?parseInt(responsedata.totalSinIva):0,//

      // }
      const ActualizarEntregable = { nmbre: "hola" };
      console.log("***************************", ActualizarEntregable);
      const formData = new FormData();
      formData.append(
        "ActualizarEntregable",
        JSON.stringify(ActualizarEntregable)
      );
      formData.append("token", respon.data.tokenSecret);
      formData.append("imagen", imagen);
      formData.append("user", user_name);
      formData.append("tipo", "OCR");
      // https://syncronizabackup-production.up.railway.app
      // https://appsyncroniza-production.up.railway.app
      const send = await axios.post(
        "https://syncronizabackup-production.up.railway.app/user/api/dashboard",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("este es el send!!!!!", send.data);
      // setBan(true);
      setResponsedata({
        nit: "",
        numFact: "",
        doc: "",
        total: "",
        totalSinIva: "",
        nombre: "",
        rete: "",
        retePorc: "",
        iva: "",
        ivaPorc: "",
        fecha: "",
        concepto: "",
        municipio: "",
        codepostal: "",
        ipc: "",
      });
      // setIsLoading(false);
      // Alert.alert("Envío de datos completado")
      // setToScan("");
      setFillData(false);
    }
  };

  const handlerScan = async (e) => {
    try {
      console.log(e.target.files);
      locations();
      peticionOcr();

      // // Solicitar permiso para acceder a la ubicación del dispositivo
      // const { status } = await Location.requestForegroundPermissionsAsync();
      // if (status !== "granted") {
      //   console.log("Permiso de ubicación denegado");

      //   Swal({
      //     title: "PERMISO DE UBICACION",
      //     text: `Debes dar permiso para acceder a tu ubicacion`,
      //     icon: "warning",
      //     buttons: ["No", "Si"],
      //   }).then((res) => {
      //     if (res) {
      //      alert("permiso otorgado")
      //     //  setIsLoading(true);
      //     //       realizarPeticion(0,0);
      //     }else{
      //       alert("permiso no otrogado")
      //     }
      //   });
      //   return;
      // }

      // // Obtener la ubicación actual del dispositivo

      // console.log("loadingggggg");
      // const location = await Location.getCurrentPositionAsync({});
      // console.log("loadin111");
      // // Extraer las coordenadas (latitud y longitud) de la ubicación
      // const { latitude, longitude } = location.coords;
      // console.log("loadin2222");
      // //   setFillData(true)
      // setIsLoading(true);
      // realizarPeticion(latitude,longitude)
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlerCancel = () => {
    setResponsedata({
      nit: "",
      numFact: "",
      doc: "",
      total: "",
      totalSinIva: "",
      nombre: "",
      rete: "",
      retePorc: "",
      iva: "",
      ivaPorc: "",
      fecha: "",
      concepto: "",
      municipio: "",
      codepostal: "",
      ipc: "",
    });
    setFillData(false);
    setImageSrc(null);
  };

  const handlerSend = (e) => {
    e.preventDefault();
    conetionMicrosoft();
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    setResponsedata({
      ...responsedata,
      [name]: value,
    });
    // if (name === "ivaPorc" || name === "totalSinIva") {

    //   value = (!responsedata.ivaPorc || !responsedata.totalSinIva) ? "" : `${responsedata.totalSinIva*responsedata.ivaPorc/100}`
    //   console.log(value,"despues",responsedata.ivaPorc)
    //   setResponsedata({
    //     ...responsedata,
    //     [name]: value,
    //   });
    // }else if (name === "rete"|| name === "totalSinIva") {
    //   value =  !responsedata.retePorc || !responsedata.totalSinIva ? "" : `${responsedata.totalSinIva*responsedata.retePorc/100}`
    //   setResponsedata({
    //     ...responsedata,
    //     [name]: value,
    //   });
    // }else{
    //   setResponsedata({
    //     ...responsedata,
    //     [name]: value,
    //   });
    // }

    // setResponsedata({
    //   ...responsedata,
    //   [name]: value,
    // });
    // console.log("on change", responsedata);
  };

  return (
    <div className="mt-44 m-6">
      <div className="text-center m-14">
        <h1 className="font-serif text-5xl">
          <span className="font-s">GASTOS</span>
        </h1>
      </div>
      <form className="" onSubmit={handlerSend}>
        <div className="">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 mx-auto">
            {imageSrc ? (
              <>
                <div className="mx-auto text-center h-90 mb-14 rounded-lg ">
                  <div className="rounded-lg grid grid-cols-1 bg-blue-300/50 ">
                    <div className=" col-span-1  flex items-center justify-center mb-5">
                      <img
                        className="w-72 h-72 rounded-t-lg"
                        src={imageSrc}
                        alt=""
                      />
                    </div>

                    <div className="col-span-1 flex items-center justify-center mb-5">
                      <div className="hover:bg-slate-300 w-28 h-16 flex items-center justify-center border-2 rounded-full border-gray-700 border-dashed cursor-pointer bg-gray-50  ">
                        <button
                          className="flex items-center justify-center w-28 h-16 rounded-full"
                          type="button"
                          onClick={handlerCancel}
                        >
                          <GiCancel size={40} />
                          <p>cancelar</p>
                        </button>
                      </div>
                      <div className=" ml-5 hover:bg-slate-300 w-28 h-16 flex items-center justify-center border-2 rounded-full border-gray-700 border-dashed cursor-pointer bg-gray-50 ">
                        <button
                          className="flex items-center justify-center w-28 h-16 rounded-full"
                          type="button"
                          onClick={handlerScan}
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
                <div className="h-96 bg-blue-300/50 flex items-center justify-center border-2 border-black m-5 lg:m-0 ">
                  <div className=" rounded-lg ">
                    {/* <div className="hover:bg-slate-300 mr-5 lg:mr-60  w-28 h-28 lg:w-48 lg:h-48 md:w-36 md:h-36 flex flex-col items-center justify-center border-2 rounded-full border-gray-700 border-dashed  cursor-pointer bg-gray-50">
                  <button type="button" onClick={openCamera}>
                    <AiFillCamera size={90} />
                  </button>
                </div> */}
                    <div className="w-28">
                      <label className="hover:bg-slate-300    flex flex-col items-center justify-center border-2 rounded-full border-gray-700 border-dashed  cursor-pointer bg-gray-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="text-xs text-gray-500 ">
                            <GrGallery size={80} />
                          </p>
                        </div>
                        <input
                          name="image"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          // ref={fileInputRef}
                          accept=".jpg, .jpeg"
                          onInput={handlerValidation}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4  mx-auto border-2 border-black bg-slate-200/50 p-2">
              <div className="lg:col-span-4 col-span-2 flex items-center justify-center">
                <div
                  className="relative mb-3 w-full   "
                  data-te-input-wrapper-init
                >
                  <input
                    value={responsedata.concepto}
                    name="concepto"
                    onChange={handleOnChange}
                    type="text"
                    className=" bg-blue-300/50 peer block min-h-[auto] w-full text-neutral-950 rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  "
                  />
                  <label
                    htmlFor="Concepto"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    Concepto
                  </label>
                </div>
              </div>
              {/* NIT */}
              <div className="flex items-center justify-center col-span-1 ">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    value={responsedata.nit}
                    name="nit"
                    onChange={handleOnChange}
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="NIT/CC"
                  />
                  <label
                    htmlFor="NIT/CC"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    NIT/CC
                  </label>
                </div>
              </div>
              {/* NOMBRE */}
              <div className="flex items-center justify-center col-span-1">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    value={responsedata.nombre}
                    name="nombre"
                    onChange={handleOnChange}
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="Nombre"
                  />
                  <label
                    htmlFor="Nombre"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    Nombre
                  </label>
                </div>
              </div>
              {/* VALOR PAGADO */}
              <div className="flex items-center justify-center col-span-1 ">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    value={responsedata.total}
                    name="total"
                    onChange={handleOnChange}
                    type="number"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="Valor pagado"
                  />
                  <label
                    htmlFor="Valor pagado"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    $ Valor pagado
                  </label>
                </div>
              </div>
              {/* IVA */}
              <div className="flex items-center justify-center col-span-1 ">
                <div className="grid grid-cols-3">
                  <div
                    className="relative mb-3 col-span-2 "
                    data-te-input-wrapper-init
                  >
                    <input
                      value={
                        fillData
                          ? !responsedata.ivaPorc || !responsedata.totalSinIva
                            ? ""
                            : `${
                                (responsedata.totalSinIva *
                                  responsedata.ivaPorc) /
                                100
                              }`
                          : ""
                      }
                      name="iva"
                      onChange={handleOnChange}
                      type="number"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                      id="Valor Iva"
                    />
                    <label
                      htmlFor="Valor Iva"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    >
                      Valor Iva
                    </label>
                  </div>
                  <div
                    className="relative  mb-3 col-span-1 "
                    data-te-input-wrapper-init
                  >
                    <input
                      value={
                        fillData
                          ? !responsedata.ivaPorc
                            ? ""
                            : `${responsedata.ivaPorc}`
                          : ""
                      }
                      name="ivaPorc"
                      onChange={handleOnChange}
                      type="number"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                      id="$ IVA"
                    />
                    <label
                      htmlFor="$ IVA"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    >
                      %
                    </label>
                  </div>
                </div>
              </div>
              {/* RETEFUENTE */}
              <div className="flex items-center justify-center col-span-1">
                <div className="grid grid-cols-3">
                  <div
                    className="relative mb-3 col-span-2 "
                    data-te-input-wrapper-init
                  >
                    <input
                      value={
                        fillData
                          ? !responsedata.retePorc || !responsedata.totalSinIva
                            ? ""
                            : `${
                                (responsedata.totalSinIva *
                                  responsedata.retePorc) /
                                100
                              }`
                          : ""
                      }
                      name="rete"
                      onChange={handleOnChange}
                      type="number"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                      id="Valor Rete"
                    />
                    <label
                      htmlFor="Valor Rete"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    >
                      Valor Rete
                    </label>
                  </div>
                  <div
                    className="relative mb-3 col-span-1 "
                    data-te-input-wrapper-init
                  >
                    {console.log(responsedata)}
                    <input
                      value={fillData ? `${responsedata.retePorc}` : ""}
                      name="retePorc"
                      onChange={handleOnChange}
                      type="number"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                      id="% Rete"
                    />
                    <label
                      htmlFor="% Rete"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                    >
                      %
                    </label>
                  </div>
                </div>
              </div>
              {/* FECHA */}
              <div className="flex items-center justify-center col-span-1">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    value={responsedata.fecha}
                    name="fecha"
                    onChange={handleOnChange}
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="Fecha"
                  />
                  <label
                    htmlFor="Fecha"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    Fecha
                  </label>
                </div>
              </div>
              {/* CODIGO POSTAL */}
              <div className="flex items-center justify-center col-span-1">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="CodPostal"
                  />
                  <label
                    htmlFor="CodPostal"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    CodPostal
                  </label>
                </div>
              </div>
              {/* MUNICIPIO */}
              <div className="flex items-center justify-center col-span-1">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="Municipio"
                  />
                  <label
                    htmlFor="Municipio"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    Municipio
                  </label>
                </div>
              </div>
              {/* IPC */}
              <div className="flex items-center justify-center col-span-1 lg:col-start-2 lg:col-end-2">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="Ipc"
                  />
                  <label
                    htmlFor="Ipc"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    Ipc
                  </label>
                </div>
              </div>
              {/* SUBTOTAL */}
              <div className="flex items-center justify-center col-span-1 lg:col-start-3 lg:col-end-3">
                <div
                  className="relative mb-3 w-full  "
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-blue-300/50 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="SubTotal"
                  />
                  <label
                    htmlFor="SubTotal"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
                  >
                    SubTotal
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" text-center">
          <button
            type="submit"
            className="mt-10 inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
          >
            Enviar
          </button>
        </div>
      </form>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-full">
            <div className="w-full flex justify-center">
              <img
                className="w-full max-w-md"
                src={loading}
                alt="Imagen capturada"
              />
            </div>
          </div>
        </div>
      )}
      {/* {opencam && <Modalcam closeCam={openCamera} imageData={imageData} />} */}
    </div>
  );
};

export default Gastos;
