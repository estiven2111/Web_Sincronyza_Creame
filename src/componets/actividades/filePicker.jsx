import React, { useState } from 'react';

const FilePickerButton = ({ ent, handlerInfo, deleteInfo, justUploaded, numero }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handlerInfo({ [ent]: { file: selectedFile, Numero: numero } });
    }
  };

  const handlerCancel = () => {
    setFile(null);
    deleteInfo(ent);
  };

  return (
    <div className="flex items-center justify-center p-2 w-full">
      {file ? (
        <div className="h-10 px-2 rounded text-center bg-lightblue flex items-center justify-center bg-indigo-300 w-9/10">
          {file.name}
        </div>
      ) : (
        <div className={`${justUploaded ? 'bg-gray-400' : 'bg-white'}  w-9/10 h-10 px-2 rounded text-center flex items-center justify-center text-black text-sm`}>
          {ent}
        </div>
      )}
      {file ? (
        <button
          className="w-10 h-10 bg-lightgrey rounded flex items-center justify-center ml-2 bg-red-400"
          onClick={handlerCancel}
        >
          X
        </button>
      ) : (
        <label className={`${justUploaded ? 'bg-gray-400' : 'bg-indigo-200'} w-1/10 h-10 bg-lightgrey rounded flex items-center justify-center ml-2 cursor-pointer text-black`}>
          ...
          <input type="file" className="hidden" onChange={handleFileChange} disabled={justUploaded?true:false}/>
        </label>
      )}
    </div>
  );
};

export default FilePickerButton;