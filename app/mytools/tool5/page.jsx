'use client'
import React, { useState } from 'react';

const conversionRates = {
  squareFeet: {
    marla: 0.0036,
    squareMeter: 0.09290304,
    kanal: 0.0001836,
  },
  marla: {
    squareFeet: 272,
    squareMeter: 25.2928526,
    kanal: 0.05,
  },
  squareMeter: {
    squareFeet: 10.763910417,
    marla: 0.039536861,
    kanal: 0.00197684,
  },
  kanal: {
    squareFeet: 5445,
    marla: 20,
    squareMeter: 505.857,
  },
};

export default function AreaConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('squareFeet');
  const [toUnit, setToUnit] = useState('squareMeter');
  const [result, setResult] = useState('');

  function convertArea() {
    const convertedValue =
      (inputValue * conversionRates[fromUnit][toUnit]).toFixed(2);
    setResult(convertedValue);
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Area Converter</h1>

      <div className="w-full md:w-1/2">
        <div className="flex items-center mb-4">
          <label htmlFor="inputValue" className="w-32 font-semibold">
            Input Value:
          </label>
          <input
            type="number"
            id="inputValue"
            className="flex-grow px-2 py-1 border border-gray-300 rounded"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="fromUnit" className="w-32 font-semibold">
            From Unit:
          </label>
          <select
            id="fromUnit"
            className="flex-grow px-2 py-1 border border-gray-300 rounded"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {Object.keys(conversionRates).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="toUnit" className="w-32 font-semibold">
            To Unit:
          </label>
          <select
            id="toUnit"
            className="flex-grow px-2 py-1 border border-gray-300 rounded"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {Object.keys(conversionRates).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <button
         className="bg-blue-500 text-white rounded-lg px-6 py-3 text-lg font-medium w-full"
          onClick={convertArea}
        >
          Convert
          
        </button>

        {result && (
          <div className="mt-4">
            <p className="font-semibold">
              {inputValue} {fromUnit} is equal to {result} {toUnit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
