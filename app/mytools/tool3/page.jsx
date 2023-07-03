'use client'
import React, { useState, useRef, useEffect } from 'react';
import FormInputGroup from '../Form';
import Chart from 'chart.js/auto';
import { FaWrench } from 'react-icons/fa';
import Heading from '@/app/components/Heading';

export default function Form() {
  const [homeArea, setHomeArea] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [structure, setStructure] = useState('');
  const [foundationStructure, setFoundationStructure] = useState('');
  const [plumbing, setPlumbing] = useState('');
  const [electrical, setElectrical] = useState('');
  const [wood, setWood] = useState('');
  const [metal, setMetal] = useState('');
  const [tiles, setTiles] = useState('');
  const [fixtures, setFixtures] = useState('');
  const [error, setError] = useState('');

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      updateChart();
    }
  }, [downPayment, loanAmount]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  function calculateLoanAmount() {
    if (!homeArea || isNaN(homeArea) || parseFloat(homeArea) <= 0) {
      setLoanAmount('');
      setError('Please enter a valid positive value for Home Area.');
      return;
    }

    if (!downPayment || isNaN(downPayment) || parseFloat(downPayment) < 0) {
      setLoanAmount('');
      setError('Please enter a valid positive value for Down Payment.');
      return;
    }

    if (structure === 'greyStructureWithMaterial')
     {
      calculateGreyStructureWithMaterial();
    } else if (structure === 'greyStructureWithOutMaterial')
     {
      calculateGreyStructureWithOutMaterial();
    } else if (structure === 'completeStructureWithMaterial') 
    {
      calculateCompleteStructureWithMaterial();
    } else if (structure === 'completeStructureWithOutMaterial')
     {
      calculateCompleteStructureWithOutMaterial();
    }

    updateChart();
    setError('');
  }

  function calculateGreyStructureWithMaterial() {
    const greyStructureCost = homeArea * 272 * 3000 - downPayment;
    setLoanAmount(greyStructureCost);
    setFoundationStructure(homeArea * 272 * 900000);
    setPlumbing(homeArea * 272 * 178333);
    setElectrical(homeArea * 272 * 34666);
    setWood(homeArea * 272 * 0);
    setMetal(homeArea * 272 * 0);
    setTiles(homeArea * 272 * 0);
    setFixtures(homeArea * 272 * 0);
  }

  function calculateGreyStructureWithOutMaterial() {
    const greyStructureCost2 = homeArea * 272 * 2800 - downPayment;
    setLoanAmount(greyStructureCost2);
    setFoundationStructure(homeArea * 272 * 891333.33);
    setPlumbing(homeArea * 272 * 175666.66);
    setElectrical(homeArea * 272 * 33136.66);
    setWood(homeArea * 272 * 0);
    setMetal(homeArea * 272 * 0);
    setTiles(homeArea * 272 * 0);
    setFixtures(homeArea * 272 * 0);
  }

  function calculateCompleteStructureWithMaterial() {
    const completeStructureCost = homeArea * 272 * 12000 - downPayment;
    setLoanAmount(completeStructureCost);
    setFoundationStructure(homeArea * 272 * 900000);
    setPlumbing(homeArea * 272 * 178333);
    setElectrical(homeArea * 272 * 34666);
    setWood(homeArea * 272 * 100000);
    setMetal(homeArea * 272 * 100000);
    setTiles(homeArea * 272 * 100000);
    setFixtures(homeArea * 272 * 100000);
  }

  function calculateCompleteStructureWithOutMaterial() {
    const completeStructureCost2 = homeArea * 272 * 8000 - downPayment;
    setLoanAmount(completeStructureCost2);
    setFoundationStructure(homeArea * 272 * 891333.33);
    setPlumbing(homeArea * 272 * 175666.66);
    setElectrical(homeArea * 272 * 33136.66);
    setWood(homeArea * 272 * 100000);
    setMetal(homeArea * 272 * 100000);
    setTiles(homeArea * 272 * 100000);
    setFixtures(homeArea * 272 * 100000);
  }

  function updateChart() {
    const chartData = {
      labels: ['Foundation & Structure', 'Plumbing Works', 'Electrical Works', 'Wood', 'Metal', 'Tiles', 'Fittings & Fixtures'],
      datasets: [
        {
          data: [foundationStructure, plumbing, electrical, wood, metal, tiles, fixtures],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F5A9BC', '#85C1E9'],
        },
      ],
    };

    if (chartRef.current) {
      chartRef.current.data = chartData;
      chartRef.current.update();
    } else {
      chartRef.current = new Chart(chartContainerRef.current, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  return (
    <>
      <div className="mt-10"></div>

      <Heading title="Construction Cost Calculator" subtitle="" center />

      <div className="flex flex-wrap mt-10">
        <div className="w-full md:w-1/2">
          <form onSubmit={(e) => e.preventDefault()} className="max-w-lg mx-auto mt-8">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Construction type</label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={structure}
                onChange={(e) => setStructure(e.target.value)}
              >
                <option value="greyStructureWithMaterial">Grey Structure - With Material</option>
                <option value="greyStructureWithOutMaterial">Grey Structure - Without Material</option>
                <option value="completeStructureWithMaterial">Complete Structure - With Material</option>
                <option value="completeStructureWithOutMaterial">Complete Structure - Without Material</option>
              </select>
            </div>

            <br></br>

            <FormInputGroup
              text="Home Area in marla"
              icon={<FaWrench />}
              placeholder="Enter the area of Home"
              onKeyUp={calculateLoanAmount}
              value={homeArea}
              onInput={(e) => setHomeArea(e.target.value)}
            />

            {homeArea && homeArea <= 0 && (
              <p className="text-red-500 text-xs mt-1">Home Area must be greater than 0.</p>
            )}

            <FormInputGroup
              text="Down Payment"
              icon={<FaWrench />}
              placeholder="Enter Pre funds"
              onKeyUp={calculateLoanAmount}
              value={downPayment}
              onInput={(e) => setDownPayment(e.target.value)}
            />

            {downPayment && downPayment < 0 && (
              <p className="text-red-500 text-xs mt-1">Down Payment must be a positive value.</p>
            )}

            <FormInputGroup
              text="Left Amount"
              icon={<FaWrench />}
              placeholder="Funds Needed"
              readOnly={true}
              value={loanAmount}
            />

            <h4 className="text-blue-500 font-bold">PKR {loanAmount}</h4>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-6 py-3 text-lg font-medium w-full"
              onClick={calculateLoanAmount}
            >
              Calculate
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 mt-10 md:mt-10">
          <canvas ref={chartContainerRef}></canvas>
        </div>
      </div>
    </>
  );
}


