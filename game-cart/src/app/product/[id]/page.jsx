"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { toast } from 'react-hot-toast';
import { FaStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';

const ProductPage = () => {
  const { id } = useParams();
  const { products, addToCart, cartItems } = useAppContext();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find(item => item._id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error('Product not found');
    
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      ...product,
      quantity: quantity
    });
    
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

 
  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
            {images[selectedImage] && (
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            )}
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-indigo-500' : 'border-gray-200'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-5 h-5" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            ${product.offerPrice || product.price}
            {product.offerPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.price}
              </span>
            )}
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="border-t border-b border-gray-200 py-4">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>• High-quality materials</li>
              <li>• Free shipping on orders over $50</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-l-md transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center border-t border-b border-indigo-200 bg-white py-2">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-r-md transition-colors"
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>

          <div className="flex space-x-4 pt-4">
            <button className="flex items-center space-x-2 text-rose-500 hover:text-rose-600 transition-colors">
              <FaHeart className="w-5 h-5" />
              <span>Add to Wishlist</span>
            </button>
            <button className="flex items-center space-x-2 text-indigo-500 hover:text-indigo-600 transition-colors">
              <FaShare className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
            {['Description', 'Specifications', 'Reviews (24)'].map((tab) => (
              <button
                key={tab}
                className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600"
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="py-6">
          <p className="text-gray-700">
            {product.description}
            {Array(3).fill().map((_, i) => (
              <p key={i} className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </p>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;