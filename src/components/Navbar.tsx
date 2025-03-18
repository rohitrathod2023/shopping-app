import { useState } from 'react';
import { CiSearch, CiUser, CiShoppingCart } from 'react-icons/ci';
import { HiMenu, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/cart');  
  };

  const handleHomeNavigate = () => {
    navigate('/');  
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-xs z-50">
        {/* Desktop & Mobile View */}
        <nav className="flex justify-between items-center px-6 py-4 gap-2 md:px-12">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            {isMenuOpen ? (
              <HiX size={30} className="cursor-pointer" onClick={toggleMenu} />
            ) : (
              <HiMenu size={30} className="cursor-pointer" onClick={toggleMenu} />
            )}
          </div>
          
          {/* Search Bar (Centered in Mobile) */}
          <div className="flex items-center border rounded-md px-2 bg-gray-100 md:hidden flex-grow mx-4">
            <input 
              type="text" 
              placeholder="Search items..." 
              className="outline-none bg-transparent px-2 py-1 w-full"
            />
            <CiSearch size={24} className="text-gray-600 cursor-pointer" />
          </div>
          
         
          <CiShoppingCart 
            size={24} 
            className="text-gray-600 cursor-pointer md:hidden" 
            onClick={handleNavigate} 
          />
          
          
          <div 
            className="hidden md:block text-xl font-bold text-gray-800 cursor-pointer"
            onClick={handleHomeNavigate} 
          >
            ShoppingApp
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">All Product</li>
            <li className="hover:text-blue-600 cursor-pointer">New Arrivals</li>
            <li className="hover:text-blue-600 cursor-pointer">Our Collection</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          </ul>
          
          {/* Search & Icons (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center border rounded-md px-2 bg-gray-100">
              <input 
                type="text" 
                placeholder="Search items..." 
                className="outline-none bg-transparent px-2 py-1 w-40 focus:w-60 transition-all"
              />
              <CiSearch size={24} className="text-gray-600 cursor-pointer" />
            </div>
            <CiShoppingCart size={24} className="text-gray-600 cursor-pointer" onClick={handleNavigate} />
            <CiUser size={24} className="text-gray-600 cursor-pointer" />
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-sm absolute w-full top-[60px] left-0 p-4 z-10 ">
            <ul className="flex flex-col space-y-4 text-gray-700 items-center">
              <li className="hover:text-blue-600 cursor-pointer">All Products</li>
              <li className="hover:text-blue-600 cursor-pointer">New Arrivals</li>
              <li className="hover:text-blue-600 cursor-pointer">Our Collection</li>
              <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            </ul>
          </div>
        )}
      </header>
      <div className="pt-[60px]"></div>
    </>
  );
};

export default Navbar;
