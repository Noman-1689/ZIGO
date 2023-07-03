import React from 'react';

export default function FormInputGroup({ text, pkr,icon, placeholder, value, onInput, onKeyUp, readOnly = false }) {
  return (
    <div className="flex mb-3">
      <div className="w-max flex items-center px-3 py-2 bg-gray-200 text-gray-700 gap-2">{text}{icon}
      <span className='font-bold uppercase' >{pkr}</span>
      
      </div>

      <input
        type="number"
        className="flex-grow px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
      />
    </div>
  );
}
