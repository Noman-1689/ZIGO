'use client'

import React, { useState, useRef, useEffect,useMemo } from 'react';
import FormInputGroup from '../Form';
import Chart from 'chart.js/auto';
import Heading from '@/app/components/Heading';

export default function Form() {
  const [homeValue, setHomeValue] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [error, setError] = useState('');
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      updateChart();
    }
  }, [monthlyPayment]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  function calculateLoanAmount() {
    const homeValueNumber = parseFloat(homeValue);
    const downPaymentNumber = parseFloat(downPayment);

    if (isNaN(homeValueNumber) || isNaN(downPaymentNumber) || homeValueNumber <= 0 || downPaymentNumber < 0) {
      setLoanAmount('');
      setError('Please enter valid positive values.');
    } else {
      const calculatedLoanAmount = Math.max(homeValueNumber - downPaymentNumber, 0);
      setLoanAmount(calculatedLoanAmount);
      setError('');
    }
  }

  function calculateMonthlyPayment() {
    const interestRateNumber = parseFloat(interestRate);
    const loanAmountNumber = parseFloat(loanAmount);
    const loanDurationNumber = parseFloat(loanDuration);

    if (
      isNaN(interestRateNumber) ||
      isNaN(loanAmountNumber) ||
      isNaN(loanDurationNumber) ||
      interestRateNumber <= 0 ||
      loanAmountNumber <= 0 ||
      loanDurationNumber <= 0
    ) {
      setMonthlyPayment(0);
      setError('Please enter valid positive values.');
      return;
    }

    function percentageToDecimal(percent) {
      return percent / 12 / 100;
    }

    function yearsToMonths(year) {
      return year * 12;
    }

    const calculatedMonthlyPayment =
      (percentageToDecimal(interestRateNumber * loanAmountNumber) /
        (1 - Math.pow(1 + percentageToDecimal(interestRateNumber), -yearsToMonths(loanDurationNumber)))) || 0;

    setMonthlyPayment(calculatedMonthlyPayment);
    updateChart();
    setError('');
  }
  const formattedmonthlyPayment = useMemo(() => {
    if (monthlyPayment < 1000) {
      return monthlyPayment.toFixed(3);
    } else if (monthlyPayment >= 1000 && monthlyPayment < 100000) {
      const thousands = Math.floor(monthlyPayment / 1000);
      const remainder = monthlyPayment % 1000 === 0 ? '' : `.${Math.floor(monthlyPayment % 1000 / 100)}`;
      return `${thousands}${remainder} thousand`;
    } else if (monthlyPayment >= 100000 && monthlyPayment < 10000000) {
      const lacs = Math.floor(monthlyPayment / 100000);
      const remainder = monthlyPayment % 100000 === 0 ? '' : `.${Math.floor(monthlyPayment % 100000 / 10000)}`;
      return `${lacs}${remainder} lac`;
    } else if (monthlyPayment >= 10000000) {
      const crores = Math.floor(monthlyPayment / 10000000);
      const remainder = monthlyPayment % 10000000 === 0 ? '' : `.${Math.floor(monthlyPayment % 10000000 / 1000000)}`;
      return `${crores}${remainder} crore`;
    }
  }, [monthlyPayment]);


  function updateChart() {
    const chartData = {
      labels: ['Home Value', 'Down Payment', 'Loan Amount', 'Loan Duration'],
      datasets: [
        {
          data: [homeValue, downPayment, loanAmount, loanDuration],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#FF5733'],
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

      <Heading
        title="Mortgage Calculator"
        subtitle="Quickly estimate your total mortgage payment including principal and interest"
        center
      />

      <div className="flex flex-wrap mt-10">
        <div className="w-full md:w-1/2">
          <form onSubmit={(e) => e.preventDefault()} className="max-w-lg mx-auto mt-8">
            <FormInputGroup
              text="Home Value "
              pkr='Pkr'
              placeholder="Enter the value of Home "
              onKeyUp={calculateLoanAmount}
              value={homeValue}
              onInput={(e) => setHomeValue(e.target.value)}
            />

            <FormInputGroup
              text="Down Payment"
              pkr='Pkr'
              placeholder="Enter Pre funds"
              onKeyUp={calculateLoanAmount}
              value={downPayment}
              onInput={(e) => setDownPayment(e.target.value)}
            />

            <FormInputGroup
              text="Loan Amount"
             pkr='Pkr'
              placeholder="Funds Needed"
              readOnly={true}
              value={loanAmount}
            />

            <FormInputGroup
              text="Interest Rate %"
              placeholder="Enter your Interest Rate"
              value={interestRate}
              onInput={(e) => setInterestRate(e.target.value)}
            />

            <FormInputGroup
              text="Loan Duration (years)"
              placeholder="Enter duration in years"
              value={loanDuration}
              onInput={(e) => setLoanDuration(e.target.value)}
            />

            {error && <p className="text-red-500">{error}</p>}

            <h4 className="text-blue-500 font-bold">PKR {formattedmonthlyPayment} / month</h4>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-6 py-3 text-lg font-medium w-full"
              onClick={calculateMonthlyPayment}
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
