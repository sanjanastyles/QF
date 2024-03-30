import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './success.css'
const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8">
        <svg
          className="animate-spin h-12 w-12 text-indigo-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-1.654 0-3.165-.48-4.449-1.291z"
          ></path>
        </svg>
      </div>
      <p className="text-xl font-semibold text-gray-800 mb-4">Payment Successful!</p>
      <p className="text-gray-600">Redirecting to dashboard...</p>
    </div>
  );
};

export default PaymentSuccessPage;