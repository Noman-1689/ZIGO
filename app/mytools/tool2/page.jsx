'use client'
import React, { useState } from 'react';

const AffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState('');
  const [monthlyDebt, setMonthlyDebt] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [isAffordable, setIsAffordable] = useState(false);
  const [maxAffordablePrice, setMaxAffordablePrice] = useState(0);


  const calculateAffordability = () => {
    const income = Number(annualIncome);
    const debt = Number(monthlyDebt);
    const downPaymentAmount = Number(downPayment);

    const monthlyIncome = income / 12;
    const monthlyDebtPayment = debt;
    const maxMonthlyPayment = monthlyIncome * 0.3;
    const remainingMonthlyPayment = maxMonthlyPayment - monthlyDebtPayment;

    const maxAffordableLoan = remainingMonthlyPayment * 30;
    const maxAffordablePrice = maxAffordableLoan + downPaymentAmount;

    setMaxAffordablePrice(maxAffordablePrice);
    setIsAffordable(true);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Affordability Calculator</h1>

      <div className="w-full md:w-1/2">
        <div className="flex items-center mb-4">
          <label htmlFor="annualIncome" className="w-48 font-semibold">
            Annual Income (PKR):
          </label>
          <input
            type="number"
            id="annualIncome"
            className="flex-grow px-2 py-1 border border-gray-300 rounded"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="monthlyDebt" className="w-48 font-semibold">
            Monthly Debt Payments (PKR):
          </label>
          <input
            type="number"
            id="monthlyDebt"
            className="flex-grow px-2 py-1 border border-gray-300 rounded"
            value={monthlyDebt}
            onChange={(e) => setMonthlyDebt(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="downPayment" className="w-48 font-semibold">
            Down Payment (PKR):
          </label>
          <input
            type="number"
            id="downPayment"
            className="flex-grow px-2 py-1 border border-gray-300 rounded"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 text-white rounded-lg px-6 py-3 text-lg font-medium w-full"
          onClick={calculateAffordability}
        >
          Calculate Affordability
        </button>

        {isAffordable && (
          <div className="mt-4">
            <p className="font-semibold">
              Max Affordable Property Price: {maxAffordablePrice} PKR
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffordabilityCalculator;
