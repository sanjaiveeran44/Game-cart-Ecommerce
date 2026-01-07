"use client"
import { useEffect, useRef, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useUser } from "@clerk/nextjs";
const Product = () => {
    const { id } = useParams();
    const router = useRouter();
    const { products, addToCart } = useAppContext();
    const { isSignedIn } = useUser();

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddToCartToast, setShowAddToCartToast] = useState(false);
    const toastTimerRef = useRef(null);

    useEffect(() => {
        const fetchProductData = () => {
            try {
                // Find product in context products
                const product = products.find(p => p._id === id);
                
                if (product) {
                    setProductData(product);
                    setMainImage(Array.isArray(product.image) ? product.image[0] : product.image);
                } else {
                    console.error('Product not found');
                    // Optionally redirect to 404
                    // router.push('/404');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id, products]);

    const triggerAddToCartToast = () => {
        setShowAddToCartToast(true);
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => {
            setShowAddToCartToast(false);
        }, 2200);
    };

    const dismissAddToCartToast = () => {
        setShowAddToCartToast(false);
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }
    };

    useEffect(() => {
        return () => {
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Product not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 md:py-14">
            {/* Toast Notification */}
            <div className="fixed left-1/2 top-20 z-[60] w-[92vw] max-w-md -translate-x-1/2">
                <div className={`transform-gpu origin-right overflow-hidden rounded-2xl border border-emerald-200/60 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-[0_18px_50px_-30px_rgba(16,185,129,0.35)] ring-1 ring-emerald-300/30 transition-all duration-300 ease-out ${showAddToCartToast ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
                    <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.42l2.793 2.794 6.793-6.794a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span>Added to cart</span>
                        <button
                            onClick={dismissAddToCartToast}
                            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-xl text-emerald-800/70 hover:bg-emerald-100 hover:text-emerald-900 transition-colors"
                            aria-label="Close notification"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-12 md:space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 rounded-2xl border border-slate-200/70 bg-white p-6 md:p-8 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)]">
                    <div className="lg:pr-4 flex flex-col items-center">
                        <div className="relative w-full max-w-lg h-96 mb-6 rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
                            <Image
                                src={mainImage || (Array.isArray(productData.image) ? productData.image[0] : productData.image || '/placeholder.jpg')}
                                alt={productData.name || 'Product image'}
                                className="w-full h-full object-contain p-5"
                                width={800}
                                height={600}
                                priority
                                onError={(e) => {
                                    e.target.src = '/placeholder.jpg';
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-3 w-full max-w-lg">
                            {productData.image.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className="cursor-pointer rounded-xl overflow-hidden border border-slate-200/70 hover:border-indigo-400 transition-colors duration-200 shadow-sm flex items-center justify-center h-24 bg-slate-50"
                                >
                                    <Image
                                        src={image}
                                        alt={productData.name}
                                        className="w-full h-full object-contain p-2"
                                        width={150}
                                        height={100}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                        <p className="text-xs font-semibold tracking-widest text-indigo-700">PRODUCT</p>
                        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">
                            {productData.name}
                        </h1>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex items-center gap-0.5">
                                <Image className="h-5 w-5" src={assets.star_icon} alt="star_icon" />
                                <Image className="h-5 w-5" src={assets.star_icon} alt="star_icon" />
                                <Image className="h-5 w-5" src={assets.star_icon} alt="star_icon" />
                                <Image className="h-5 w-5" src={assets.star_icon} alt="star_icon" />
                                <Image
                                    className="h-5 w-5"
                                    src={assets.star_dull_icon}
                                    alt="star_dull_icon"
                                />
                            </div>
                            <p className="text-slate-600 text-sm font-medium">(4.5 Ratings)</p>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6 text-base md:text-lg">
                            {productData.description}
                        </p>

                        <div className="flex flex-wrap items-end gap-3 mb-8">
                            <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                                ${productData.offerPrice}
                            </p>
                            <span className="text-lg md:text-2xl font-medium text-slate-500 line-through">
                                ${productData.price}
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                                Free delivery
                            </span>
                        </div>

                        <hr className="border-slate-200/70 my-6" />

                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full bg-white rounded-xl border border-slate-200/70 overflow-hidden">
                                <tbody>
                                    <tr className="border-b border-slate-200/70">
                                        <td className="py-3 px-4 font-semibold text-slate-700">Brand</td>
                                        <td className="py-3 px-4 text-slate-600">Generic</td>
                                    </tr>
                                    <tr className="border-b border-slate-200/70">
                                        <td className="py-3 px-4 font-semibold text-slate-700">Color</td>
                                        <td className="py-3 px-4 text-slate-600">Multi</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 font-semibold text-slate-700">Category</td>
                                        <td className="py-3 px-4 text-slate-600">
                                            {productData.category}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row mt-6 gap-3">
                            <button onClick={() => { addToCart(productData._id); triggerAddToCartToast(); }} className="flex-1 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-4 font-bold text-white shadow-sm hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-slate-900/15">
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    if (!isSignedIn) {
                                        router.push(`/login?redirect_url=${encodeURIComponent('/cart')}`)
                                        return
                                    }

                                    addToCart(productData._id);
                                    router.push('/cart')
                                }}
                                className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-sm shadow-indigo-500/20 hover:from-violet-500 hover:to-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
                    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
                        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 md:p-8 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)]">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                                <div>
                                    <p className="text-xs font-semibold tracking-widest text-indigo-700">YOU MAY ALSO LIKE</p>
                                    <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Related Products</h2>
                                </div>
                                <button className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/50">
                                    See all products
                                </button>
                            </div>

                            <div className="mt-6 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:gap-6 md:grid-cols-4 lg:grid-cols-5">
                                {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    ) 
};

export default Product;