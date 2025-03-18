import React, { useState, useEffect } from 'react';
import PriceFilter from './PriceFilter';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersProps {
  filters: {
    category: string[];
    priceRange: number[];
    rating: number | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string[];
    priceRange: number[];
    rating: number | null;
  }>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [tempFilters, setTempFilters] = useState({
    category: [...filters.category],
    priceRange: [...filters.priceRange],
    rating: filters.rating,
  });

  const [dropdowns, setDropdowns] = useState({
    category: true,
    price: true,
    rating: true,
    filters: true, 
  });

  useEffect(() => {
    setTempFilters({
      category: [...filters.category],
      priceRange: [...filters.priceRange],
      rating: filters.rating,
    });
  }, [JSON.stringify(filters.category), JSON.stringify(filters.priceRange), filters.rating]);

  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handlePriceChange = (range: number[]) => {
    setTempFilters((prev) => ({
      ...prev,
      priceRange: range,
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setTempFilters((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, category]
        : prev.category.filter((c) => c !== category),
    }));
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    setTempFilters((prev) => ({
      ...prev,
      rating: checked ? rating : null,
    }));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: [],
      priceRange: [0, 500],
      rating: null,
    };
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  const categoryOptions = [
    { id: "men's clothing", label: "Men's Clothing" },
    { id: "women's clothing", label: "Women's Clothing" },
    { id: "jewelery", label: "Jewelry" },
    { id: "electronics", label: "Electronics" },
  ];

  const ratingOptions = [
    { id: 4, label: "⭐⭐⭐⭐ & up" },
    { id: 3, label: "⭐⭐⭐ & up" },
    { id: 2, label: "⭐⭐ & up" },
    { id: 1, label: "⭐ & up" },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => toggleDropdown("filters")}
        >
          <CardTitle className="text-lg font-bold">Filters</CardTitle>
          {dropdowns.filters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </CardHeader>

    
      {dropdowns.filters && (
        <CardContent className="px-4 py-0">
          
          <div className="mb-4 border-b pb-3">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleDropdown("category")}
            >
              <h3 className="font-medium">Category</h3>
              {dropdowns.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {dropdowns.category && (
              <div className="mt-2 space-y-2 pl-1">
                {categoryOptions.map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={tempFilters.category.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, checked === true)
                      }
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="mb-4 border-b pb-3">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleDropdown("price")}
            >
              <h3 className="font-medium">Price Range</h3>
              {dropdowns.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {dropdowns.price && (
              <div className="mt-2 pl-1">
                <PriceFilter onPriceChange={handlePriceChange} initialRange={tempFilters.priceRange} />
              </div>
            )}
          </div>

          
          <div className="mb-4 pb-3">
            <div
              className="flex justify-between items-center cursor-pointer py-2"
              onClick={() => toggleDropdown("rating")}
            >
              <h3 className="font-medium">Rating</h3>
              {dropdowns.rating ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {dropdowns.rating && (
              <div className="mt-2 space-y-2 pl-1">
                {ratingOptions.map((rating) => (
                  <div key={rating.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`rating-${rating.id}`}
                      checked={tempFilters.rating === rating.id}
                      onCheckedChange={(checked) =>
                        handleRatingChange(rating.id, checked === true)
                      }
                    />
                    <Label htmlFor={`rating-${rating.id}`} className="text-sm cursor-pointer">
                      {rating.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      )}

      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button variant="outline" onClick={clearAllFilters} className="text-sm">
          Clear All
        </Button>
        <Button onClick={applyFilters} className="text-sm">
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Filters;
