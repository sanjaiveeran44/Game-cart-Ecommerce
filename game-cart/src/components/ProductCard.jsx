import React, { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const FALLBACK_IMAGE = '/assets/header_headphone_image.png';

const ProductCard = ({ product }) => {
    const { currency, router, addToCart } = useAppContext();
    const [imgSrc, setImgSrc] = useState(() => {
        const image = product?.image;
        if (!image) return FALLBACK_IMAGE;
        
        if (image.startsWith('http')) {
            return image;
        }
        
        if (image.startsWith('/')) {
            return image;
        }
        
        // If it's a relative path, add the leading slash
        return `/${image}`;
    });

    const handleImageError = () => {
        setImgSrc(FALLBACK_IMAGE);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (product?._id) {
            addToCart(product._id);
        }
    };

    const handleProductClick = () => {
        if (product?._id) {
            router.push(`/product/${product._id}`);
            window.scrollTo(0, 0);
        }
    };


    return (
        <div
            onClick={handleProductClick}
            className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-40px_rgba(2,6,23,0.45)]"
        >
            <div className="relative flex h-52 w-full items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4">
                <Image
                    src={imgSrc}
                    alt={product?.name || 'Product image'}
                    className="h-full w-full object-contain"
                    width={250}
                    height={200}
                    onError={handleImageError}
                    unoptimized={!imgSrc?.startsWith('/')}
                    priority={false}
                />

                <button 
                    className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/90 shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add to wishlist functionality can be added here
                    }}
                >
                    <svg 
                        className="h-5 w-5 opacity-80" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                    </svg>
                </button>
            </div>

            <div className="flex w-full flex-1 flex-col p-5">
                <h3 className="w-full truncate text-base font-semibold text-slate-900 md:text-lg">
                    {product?.name || 'Product Name'}
                </h3>
                
                <p className="mt-1 h-[40px] overflow-hidden text-sm leading-relaxed text-slate-600">
                    {product?.description || 'No description available'}
                </p>
                
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`h-4 w-4 ${star <= Math.floor(product?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                        {product?.rating?.toFixed(1) || '0.0'}
                    </span>
                </div>

                <div className="mt-auto flex min-w-0 items-center justify-between gap-3 pt-5">
                    <div>
                        <p className="min-w-0 truncate text-xl font-extrabold tracking-tight text-slate-900">
                            {currency}{product?.offerPrice || product?.price || '0.00'}
                        </p>
                        {product?.offerPrice && product?.price > product?.offerPrice && (
                            <p className="text-sm text-slate-500 line-through">
                                {currency}{product.price}
                            </p>
                        )}
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className="inline-flex h-10 shrink-0 min-w-[132px] items-center justify-center rounded-lg bg-purple-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;