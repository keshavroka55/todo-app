import React from 'react';

/**
 * Loading Spinner Component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of spinner (small|medium|large)
 * @param {string} props.color - Color of spinner
 */
const Loader = ({ 
  size = 'medium', 
  color = 'blue',
  text = 'Loading...' 
}) => {
  // Size mapping
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  };

  // Color mapping
  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    red: 'border-red-600',
    green: 'border-green-600',
    yellow: 'border-yellow-600',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`
        animate-spin rounded-full border-t-transparent
        ${sizeClasses[size]} 
        ${colorClasses[color]}
      `}></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;