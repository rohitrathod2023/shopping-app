import { useEffect, useState, useCallback } from "react";
import Filters from "../components/Filters";
import axios from "axios";
import { Skeleton } from "../components/ui/skeleton";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number };
}

const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<{ category: string[]; priceRange: number[]; rating: number | null }>(
    {
      category: [],
      priceRange: [0, 500],
      rating: null,
    }
  );

  const BATCH_SIZE = 12;
  const [currentBatch, setCurrentBatch] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const applyFilters = useCallback(() => {
    if (!products.length) return;

    let filtered = [...products];

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) => filters.category.includes(product.category));
    }

    if (filters.rating !== null) {
      filtered = filtered.filter((product) => Math.floor(product.rating?.rate ?? 0) >= filters.rating!);
    }

    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    setFilteredProducts(filtered);
    setCurrentBatch(1);
  }, [products, JSON.stringify(filters.category), JSON.stringify(filters.priceRange), filters.rating]);

  useEffect(() => {
    const endIndex = currentBatch * BATCH_SIZE;
    setDisplayedProducts(filteredProducts.slice(0, endIndex));
  }, [filteredProducts, currentBatch]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleLoadMore = () => {
    setCurrentBatch((prev) => prev + 1);
  };

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="w-full h-48 rounded-md" />
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-1/2 h-4" />
              <div className="flex justify-between">
                <Skeleton className="w-1/4 h-6" />
                <Skeleton className="w-1/4 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
      </div>
    );
  }

  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="w-full lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {loading && displayedProducts.length > 0 && (
                <div className="mt-8 text-center">
                  <Skeleton className="h-10 w-32 mx-auto" />
                </div>
              )}
              {!loading && hasMoreProducts && (
                <div className="mt-8 text-center ">
                  <Button onClick={handleLoadMore} className="px-6 cursor-pointer">
                    Load More
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {displayedProducts.length} of {filteredProducts.length} products
                  </p>
                </div>
              )}
              {!loading && !hasMoreProducts && filteredProducts.length > BATCH_SIZE && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">All {filteredProducts.length} products loaded</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
