import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext"; 

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: { rate: number };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { addToCart } = useCart();

  return (
    <Card className="shadow-md rounded-lg hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
      <div className="relative w-full h-44 bg-gray-200 flex justify-center items-center rounded-md">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-sm rounded-md">
          ⭐ {product.rating.rate}
        </div>
      </div>

      <CardContent className="pl-2 flex flex-col">
        <Badge className="text-xs uppercase tracking-wider bg-gray-200 text-gray-800">
          {product.category}
        </Badge>
        <h3 className="text-lg font-semibold mt-1">{product.title}</h3>
        <p className="text-gray-600 mt-2 text-sm leading-5">
          {showFullDesc ? product.description : product.description.slice(0, 80) + "..."}
          <button className="text-blue-600 font-medium ml-1" onClick={() => setShowFullDesc(!showFullDesc)}>
            {showFullDesc ? "Less" : "More"}
          </button>
        </p>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold text-gray-900">${product.price}</p>
        <Button onClick={() => addToCart({ ...product, quantity: 1 })} className="cursor-pointer">
            Add to Cart
        </Button>

      </CardFooter>
    </Card>
  );
};

export default ProductCard;
