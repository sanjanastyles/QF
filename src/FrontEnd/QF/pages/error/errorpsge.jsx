import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './error.css'
const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg
        className="h-16 w-16 text-red-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      <p className="text-xl font-semibold text-gray-800 mb-4">Oops! Something went wrong.</p>
      <p className="text-gray-600">We are sorry, but it looks like there was an error.</p>
      <p className="text-gray-600">Redirecting to dashboard...</p>
    </div>
  );
};
export default ErrorPage;