"use client"
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
    const { products } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Earphone', label: 'Earphones' },
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Gaming', label: 'Gaming' },
        { value: 'Furniture', label: 'Furniture' }
    ];

    const sortOptions = [
        { value: 'default', label: 'Sort by' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'name', label: 'Name: A to Z' }
    ];

    useEffect(() => {
        // Simulate loading products
        setTimeout(() => {
            console.log('Products from context:', products);
            setFilteredProducts(products);
            setLoading(false);
        }, 1000);
    }, [products]);

    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by price range
        filtered = filtered.filter(product =>
            product.offerPrice >= priceRange.min && product.offerPrice <= priceRange.max
        );

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.offerPrice - b.offerPrice);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.offerPrice - a.offerPrice);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, searchTerm, sortBy, priceRange, products]);

    const handlePriceRangeChange = (type, value) => {
        setPriceRange(prev => ({
            ...prev,
            [type]: parseInt(value)
        }));
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        All Products
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Discover our complete collection of premium products
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <button
                                onClick={() => setPriceRange({ min: 0, max: 1000 })}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
                            {(showAll ? filteredProducts : filteredProducts.slice(0, 8)).map((product, index) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                        
                        {products.length > 8 && (
                            <div className="flex justify-end mt-8">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="inline-flex items-center px-6 py-3 bg-transparent text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                                >
                                    {showAll ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                            View Less
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            See More
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <Image
                            src={assets.not_found_image || assets.add_icon}
                            alt="No products found"
                            width={200}
                            height={200}
                            className="mx-auto mb-6 opacity-50"
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchTerm('');
                                setSortBy('default');
                                setPriceRange({ min: 0, max: 1000 });
                            }}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AllProducts;
