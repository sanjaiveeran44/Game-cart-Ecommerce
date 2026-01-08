"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiFilter } from "react-icons/fi";

function ProductList() {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFilteredProducts(products);
      setLoading(false);
    }, 1000);
  }, [products]);

  useEffect(() => {
   
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleDelete = (productId) => {
    console.log("Delete product:", productId);
   
  };

  const handleEdit = (productId) => {
    console.log("Edit product:", productId);
   
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-screen overflow-hidden flex flex-col">
      {/* Header with Search and Add Button */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between flex-shrink-0">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <FiFilter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <FiPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Count */}
      <div className="mb-4 text-sm text-gray-600 flex-shrink-0">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Product List - Scrollable Container */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 00-.293.707l2.414 2.414a1 1 0 00.707.293H18" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms" : "Start by adding your first product"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 overflow-y-auto max-h-[calc(100vh-280px)]">
              {filteredProducts.map((product, index) => (
                <div
                  key={`${product._id}-${index}`}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image?.[0] || "/placeholder-product.png"}
                          alt={product.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 sm:mt-0">
                          <div className="text-right">
                            <div className="text-lg font-bold text-indigo-600">
                              ${product.offerPrice || product.price}
                            </div>
                            {product.price !== product.offerPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ${product.price}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                            >
                              <FiEdit2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            >
                              <FiTrash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;