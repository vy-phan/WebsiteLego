import React, { useState } from 'react'
import CardDiscover from '../components/CardDiscover'
import useGetProducts from '../hooks/useGetProducts';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetAges from '../hooks/useGetAges';
import useGetCategories from '../hooks/useGetCategories';

const Discover = () => {
  const { products, loading, error, fetchProducts } = useGetProducts();
  const { ages, loading: loadingAges, error: errorAges, fetchAges } = useGetAges();
  const { categories, loading: loadingCategories, error: errorCategories, fetchCategories } = useGetCategories();

  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({
    under50: false,
    fiftyToHundred: false,
    hundredToTwoHundred: false,
    overTwoHundred: false
  });

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [ageFilter, setAgeFilter] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchAges();
    fetchCategories();
  }, []);

  const handleFilterPrice = (priceRange) => {
    setPriceRange(priceRange);
  };

  const handleFilterCategory = (categoryId) => {
    if (categoryFilter.includes(categoryId)) {
      setCategoryFilter(categoryFilter.filter((c) => c !== categoryId));
    } else {
      setCategoryFilter([...categoryFilter, categoryId]);
    }
  };

  const handleFilterAge = (ageId) => {
    if (ageFilter.includes(ageId)) {
      setAgeFilter(ageFilter.filter((a) => a !== ageId));
    } else {
      setAgeFilter([...ageFilter, ageId]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Price filter
    if (priceRange.under50 && product.price > 50) return false;
    if (priceRange.fiftyToHundred && (product.price <= 50 || product.price > 100)) return false;
    if (priceRange.hundredToTwoHundred && (product.price <= 100 || product.price > 200)) return false;
    if (priceRange.overTwoHundred && product.price <= 200) return false;

    // Category filter
    if (categoryFilter.length > 0 && !categoryFilter.includes(product.category)) return false;
    
    // Age filter
    if (ageFilter.length > 0 && !ageFilter.includes(product.age)) return false;

    return true;
  });

  return (
    <>
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-600">
            <span className="mr-2">
              <Link to="/" className="block transition hover:text-gray-700">
                <span className="sr-only"> Home </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </span>

            <span className="mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span className="mr-2">
              <a href="#" className="block transition hover:text-gray-700"> Discover </a>
            </span>
          </nav>

          {/* Search input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={priceRange.under50} onChange={() => handleFilterPrice({ ...priceRange, under50: !priceRange.under50 })} />
                  <span className="ml-2">Under $50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={priceRange.fiftyToHundred} onChange={() => handleFilterPrice({ ...priceRange, fiftyToHundred: !priceRange.fiftyToHundred })} />
                  <span className="ml-2">$50 - $100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={priceRange.hundredToTwoHundred} onChange={() => handleFilterPrice({ ...priceRange, hundredToTwoHundred: !priceRange.hundredToTwoHundred })} />
                  <span className="ml-2">$100 - $200</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={priceRange.overTwoHundred} onChange={() => handleFilterPrice({ ...priceRange, overTwoHundred: !priceRange.overTwoHundred })} />
                  <span className="ml-2">Over $200</span>
                </label>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={category._id}
                      onChange={() => handleFilterCategory(category._id)}
                      checked={categoryFilter.includes(category._id)}
                    />
                    <span className="ml-2">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Age Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Age Range</h4>
              <div className="space-y-2">
                {ages.map((age) => (
                  <label key={age._id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={age._id}
                      onChange={() => handleFilterAge(age._id)}
                      checked={ageFilter.includes(age._id)}
                    />
                    <span className="ml-2">{age.ageRange}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <CardDiscover key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover