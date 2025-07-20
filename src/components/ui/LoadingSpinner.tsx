import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerSizeClasses = {
    sm: 'min-h-[100px]',
    md: 'min-h-[200px]',
    lg: 'min-h-[300px]'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]} ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 mb-2`} />
      <p className="text-gray-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;