import React from 'react';

interface PriceSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  formatValue,
  onChange
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <div className="text-xl sm:text-2xl font-bold text-emerald-800">
          {formatValue(value)}
        </div>
      </div>
      
      <div className="relative">
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-inner">
          <div 
            className="h-5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-5 opacity-0 cursor-grab touch-manipulation"
          style={{ 
            WebkitAppearance: 'none',
            appearance: 'none',
            background: 'transparent'
          }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-600">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default PriceSlider;