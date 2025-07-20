import React, { useMemo, useCallback } from 'react';
import { Info } from 'lucide-react';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  icon: React.ElementType;
  info?: string;
  className?: string;
}

const SliderInput: React.FC<SliderInputProps> = React.memo(({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  icon: Icon,
  info,
  className = ''
}) => {
  // Memoize expensive calculations
  const percentage = useMemo(() => ((value - min) / (max - min)) * 100, [value, min, max]);
  const sliderId = useMemo(() => `slider-${label.toLowerCase().replace(/\s+/g, '-')}`, [label]);
  const formattedValue = useMemo(() => formatValue(value), [formatValue, value]);
  const formattedMin = useMemo(() => formatValue(min), [formatValue, min]);
  const formattedMax = useMemo(() => formatValue(max), [formatValue, max]);

  // Memoize event handler to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  }, [onChange]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Icon size={18} sm:size={20} className="text-emerald-600 flex-shrink-0" />
          <label 
            htmlFor={sliderId}
            className="text-sm sm:text-base font-bold text-gray-900 cursor-pointer"
          >
            {label}
          </label>
          {info && (
            <div className="group relative">
              <Info 
                size={16} 
                className="text-gray-400 cursor-help hover:text-gray-600 transition-colors duration-300" 
                aria-label={`Information about ${label}`}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 shadow-lg pointer-events-none max-w-xs">
                {info}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}
        </div>
        <div className="text-lg sm:text-xl font-bold text-emerald-800 flex-shrink-0 min-w-[80px] text-left sm:text-right">
          {formattedValue}
        </div>
      </div>
      
      <div className="relative">
        {/* Progress track background - Larger on mobile for better touch */}
        <div className="h-5 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-inner border border-gray-200">
          {/* Progress fill */}
          <div 
            className="h-5 sm:h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Range input - Larger touch area on mobile */}
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full h-5 sm:h-4 opacity-0 cursor-grab touch-manipulation focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 rounded-full"
          style={{ 
            WebkitAppearance: 'none',
            appearance: 'none',
            background: 'transparent'
          }}
          aria-label={`${label}: ${formattedValue}`}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-600 font-medium">
        <span className="text-left">{formattedMin}</span>
        <span className="text-right">{formattedMax}</span>
      </div>
    </div>
  );
});

SliderInput.displayName = 'SliderInput';

export default SliderInput; 