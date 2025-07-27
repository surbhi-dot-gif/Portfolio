import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry = null,
  showRetry = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="flex items-center space-x-3 text-[#ba3e2b]">
        <AlertCircle size={24} />
        <h3 
          className="text-lg font-medium"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Error
        </h3>
      </div>
      
      <p 
        className="text-[#666666] text-center max-w-md"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {message}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-transparent border border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-[#fffef2] transition-all duration-200 text-sm font-medium"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;