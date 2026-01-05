"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const OrderSummary = () => {
    const router = useRouter();
    const { cartItems, products, getCartAmount, clearCart } = useAppContext();
    const { isSignedIn } = useUser();
    const [loading, setLoading] = React.useState(false);
    
    const subtotal = getCartAmount ? getCartAmount() : 0;
    const shipping = subtotal > 0 ? 5.99 : 0; // Example shipping cost
    const tax = subtotal * 0.1; // Example 10% tax
    const total = subtotal + shipping + tax;

    const handleCheckout = async () => {
        if (!isSignedIn) {
            toast.error('Please sign in to continue');
            router.push('/sign-in');
            return;
        }

        if (Object.keys(cartItems).length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Clear cart after successful order
            clearCart();
            toast.success('Order placed successfully!');
            router.push('/orders');
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-96 h-fit sticky top-6">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200/80 p-6 md:p-7 shadow-[0_10px_30px_-10px_rgba(2,6,23,0.1)]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Order Summary
                    </h2>
                </div>
                
                <div className="space-y-4 mb-7">
                    <div className="flex justify-between text-slate-700">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                        <span className="text-slate-600">Shipping</span>
                        <span className="font-medium">{shipping > 0 ? `$${shipping.toFixed(2)}` : <span className="text-green-600">Free</span>}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                        <span className="text-slate-600">Tax (10%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-2 bg-white text-sm text-slate-500">Total</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        <span>Amount Due</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={loading || Object.keys(cartItems).length === 0}
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-white text-lg transition-all duration-400 flex items-center justify-center gap-3 relative overflow-hidden group
                    ${
                        loading || Object.keys(cartItems).length === 0
                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-60'
                            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transform'
                    }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-6 w-6 border-3 border-white/30 border-t-white"></div>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>Proceed to Checkout</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )}
                </button>

                <div className="mt-8 text-center">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">We Accept</p>
                    <div className="flex justify-center gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                            <Image src={assets.visa} alt="Visa" width={40} height={25} className="h-5 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                            <Image src={assets.mastercard} alt="Mastercard" width={40} height={25} className="h-5 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                            <Image src={assets.paypal} alt="PayPal" width={40} height={25} className="h-5 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
                <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 mb-1.5">Need Help?</h3>
                        <p className="text-sm text-slate-600 mb-3">
                            Have questions about your order? Our customer service team is here to help.
                        </p>
                        <button 
                            onClick={() => router.push('/contact')}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors group"
                        >
                            <span>Contact Support</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;