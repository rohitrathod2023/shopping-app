import React, { useState, useEffect } from 'react';
import { Slider } from "./ui/slider";

interface PriceFilterProps {
  onPriceChange: (range: number[]) => void;
  initialRange?: number[];
}

const PriceFilter: React.FC<PriceFilterProps> = ({ 
  onPriceChange,
  initialRange = [0, 500]
}) => {
  const [priceRange, setPriceRange] = useState(initialRange);
  
  useEffect(() => {
    
    if (JSON.stringify(priceRange) !== JSON.stringify(initialRange)) {
      setPriceRange(initialRange);
    }
  }, [JSON.stringify(initialRange)]); 

  const handlePriceRange = (value: number[]) => {
    setPriceRange(value);
    onPriceChange(value);
  };

  return (
    <div className="px-1">
      <Slider 
        value={priceRange}
        onValueChange={handlePriceRange}
        min={0}
        max={1000}
        step={10}
        className="w-full mt-6 mb-4"
      />
      <div className="flex justify-between text-sm">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default PriceFilter;