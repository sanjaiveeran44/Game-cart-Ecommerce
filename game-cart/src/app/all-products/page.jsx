"use client"
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { assets } from "@/assets/assets";
import Image from "next/image";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [loading, setLoading] = useState(true);

    // Sample product data
    const sampleProducts = [
        {
            _id: '1',
            name: 'Wireless Gaming Headset',
            price: 89.99,
            image: [assets.headset],
            category: 'electronics',
            rating: 4.5,
            inStock: true,
            description: 'Premium wireless gaming headset with 7.1 surround sound'
        },
        {
            _id: '2',
            name: 'Mechanical Gaming Keyboard',
            price: 129.99,
            image: [assets.md_controller_image],
            category: 'electronics',
            rating: 4.8,
            inStock: true,
            description: 'RGB mechanical keyboard with customizable backlighting'
        },
        {
            _id: '3',
            name: 'Pro Gaming Mouse',
            price: 59.99,
            image: [assets.mouse1],
            category: 'electronics',
            rating: 4.3,
            inStock: true,
            description: 'High-precision gaming mouse with adjustable DPI'
        },
        {
            _id: '4',
            name: 'Wireless Gaming Mouse',
            price: 79.99,
            image: [assets.mouse2],
            category: 'electronics',
            rating: 4.6,
            inStock: true,
            description: 'Ergonomic wireless mouse with long battery life'
        },
        {
            _id: '5',
            name: 'AirPods Pro',
            price: 249.99,
            image: [assets.airpods1],
            category: 'accessories',
            rating: 4.7,
            inStock: true,
            description: 'Active noise cancellation with spatial audio'
        },
        {
            _id: '6',
            name: 'AirPods Max',
            price: 549.99,
            image: [assets.airpods2],
            category: 'accessories',
            rating: 4.8,
            inStock: true,
            description: 'Premium over-ear headphones with ANC'
        },
        {
            _id: '7',
            name: 'AirPods 3rd Gen',
            price: 179.99,
            image: [assets.airpods3],
            category: 'accessories',
            rating: 4.4,
            inStock: true,
            description: 'Wireless earbuds with spatial audio'
        },
        {
            _id: '8',
            name: 'AirPods 2nd Gen',
            price: 129.99,
            image: [assets.airpods4],
            category: 'accessories',
            rating: 4.2,
            inStock: true,
            description: 'Classic wireless earbuds with charging case'
        },
        {
            _id: '9',
            name: 'Gaming Controller Pro',
            price: 69.99,
            image: [assets.joystick1],
            category: 'gaming',
            rating: 4.7,
            inStock: true,
            description: 'Professional gaming controller with customizable buttons'
        },
        {
            _id: '10',
            name: 'Wireless Gaming Joystick',
            price: 89.99,
            image: [assets.joystick2],
            category: 'gaming',
            rating: 4.5,
            inStock: true,
            description: 'Wireless joystick with precision controls'
        },
        {
            _id: '11',
            name: 'Laptop Stand Pro',
            price: 39.99,
            image: [assets.asus_laptop_image],
            category: 'accessories',
            rating: 4.2,
            inStock: true,
            description: 'Adjustable aluminum laptop stand for better ergonomics'
        },
        {
            _id: '12',
            name: 'USB-C Hub Deluxe',
            price: 49.99,
            image: [assets.add_icon],
            category: 'accessories',
            rating: 4.4,
            inStock: true,
            description: 'Multi-port USB-C hub with HDMI and SD card reader'
        }
    ];

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'accessories', label: 'Accessories' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'furniture', label: 'Furniture' }
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
            setProducts(sampleProducts);
            setFilteredProducts(sampleProducts);
            setLoading(false);
        }, 1000);
    }, []);

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
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
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

                        {/* Sort Dropdown */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
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
