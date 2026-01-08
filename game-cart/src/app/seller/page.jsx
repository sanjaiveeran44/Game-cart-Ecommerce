'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const AddProduct = () => {

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setOfferPrice('');
      setFiles([]);
      setSubmitMessage('Product added successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setSubmitMessage(''), 3000);
    } catch (error) {
      setSubmitMessage('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = null;
    setFiles(updatedFiles);
  };

  return (
    <div className="flex-1">
      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
          submitMessage.includes('success') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/50 space-y-6 max-w-4xl mx-auto">
        {/* Form Header */}
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details below to add a new product to your store</p>
        </div>

        {/* Product Images Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-700">Product Images</p>
            <span className="text-sm text-gray-500">Upload up to 4 images</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative group">
                <label htmlFor={`image${index}`} className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-32 h-32 flex items-center justify-center overflow-hidden hover:border-indigo-400 transition-all duration-200 hover:shadow-md">
                  <input 
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }} 
                    type="file" 
                    id={`image${index}`} 
                    hidden 
                    accept="image/*"
                  />
                  {files[index] ? (
                    <>
                      <Image
                        className="w-full h-full object-contain p-2"
                        src={URL.createObjectURL(files[index])}
                        alt={`Product Image ${index + 1}`}
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-2">
                      <Image
                        className="w-12 h-12 mx-auto mb-1 opacity-50"
                        src={assets.upload_area}
                        alt="Upload Icon"
                        width={48}
                        height={48}
                      />
                      <span className="text-xs text-gray-500">Upload</span>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-gray-700" htmlFor="product-name">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Enter product name"
              className="outline-none py-3 px-4 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-300 shadow-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-gray-700" htmlFor="category">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className="outline-none py-3 px-4 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-300 shadow-sm cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Gaming">Gaming</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>

          {/* Original Price */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-gray-700" htmlFor="product-price">
              Original Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                id="product-price"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="outline-none py-3 pl-8 pr-4 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-300 shadow-sm"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
          </div>

          {/* Offer Price */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-gray-700" htmlFor="offer-price">
              Offer Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                id="offer-price"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="outline-none py-3 pl-8 pr-4 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-300 shadow-sm"
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                required
              />
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-semibold text-gray-700" htmlFor="product-description">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="product-description"
            rows={5}
            className="outline-none py-3 px-4 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-300 shadow-sm resize-y"
            placeholder="Enter detailed product description including features, specifications, and benefits..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
          <p className="text-sm text-gray-500">{description.length}/500 characters</p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              setName('');
              setDescription('');
              setPrice('');
              setOfferPrice('');
              setFiles([]);
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Clear Form
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-8 py-3.5 font-bold rounded-lg text-lg shadow-md transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Product...
              </span>
            ) : (
              'ADD PRODUCT'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;