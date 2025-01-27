import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="text-center max-w-lg p-6">
        <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
        <p className="text-2xl mb-6 text-gray-300">Oops! The page you are looking for doesn't exist.</p>
        <div className="flex justify-center items-center mb-6">
          <svg
            className="w-16 h-16 text-blue-500 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-xl"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
