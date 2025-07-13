import React from 'react';

interface FormStepProps {
  children: React.ReactNode;
  className?: string;
}

const FormStep: React.FC<FormStepProps> = ({ children, className = '' }) => {
  return (
    <div className={`animate-fadeIn ${className}`}>
      {children}
    </div>
  );
};

export default FormStep;