import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} animate-spin border-2 border-[#ebeade] border-t-[#333333] rounded-full`}></div>
      <p 
        className={`${textSizeClasses[size]} text-[#666666]`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;