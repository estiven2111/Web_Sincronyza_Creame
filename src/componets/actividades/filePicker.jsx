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
    <div className="flex items-center justify-center p-2">
      {file ? (
        <div className="w-52 h-10 px-2 rounded text-center bg-lightblue flex items-center justify-center">
          {file.name}
        </div>
      ) : (
        <div className={`${justUploaded ? 'bg-lightblue' : 'bg-white'} w-52 h-10 px-2 rounded text-center flex items-center justify-center`}>
          {ent}
        </div>
      )}
      {file ? (
        <button
          className="w-10 h-10 bg-lightgrey rounded flex items-center justify-center ml-2"
          onClick={handlerCancel}
        >
          X
        </button>
      ) : (
        <label className="w-10 h-10 bg-lightgrey rounded flex items-center justify-center ml-2 cursor-pointer">
          ...
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};

export default FilePickerButton;