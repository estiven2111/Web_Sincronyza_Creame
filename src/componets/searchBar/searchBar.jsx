import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import axios from 'axios';
// import api from '../../api/api';

const SearchBar = () => {
  const { finalValue, searchText, globalSearch, showOptions, globalOptions } = useContext(ThemeContext);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    finalValue('');
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const user_name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const response = await axios.get(`/proyect?search=${searchText}&email=${email}`);
        const data = await response.data;
        setOptions(data.map(pro => pro.proyecto));
        globalOptions(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchText === '') {
      globalOptions(false);
    } else if (!options.includes(searchText)) {
      fetchOptions();
    }
  }, [searchText]);

  const handleSearch = (text) => {
    if (text !== searchText) {
      console.log(text)
      globalSearch(text);
      globalOptions(true);
    } else {
      globalOptions(false);
    }
  };

  const handleSelectOption = (option) => {
    console.log(option)
    globalSearch(option);
    finalValue(option);
    globalOptions(false);
  };

  return (
    <div className="w-full px-4">
      <input
        className="input flex w-full grow rounded md:w-1/2"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Busca el Proyecto o sin Proyecto"
      />
      {showOptions && (
        <div className="modalContainer absolute bg-gray-50 p-1 m-1 border-2 border-gray-200 rounded">
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleSelectOption(option)}>{option}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
