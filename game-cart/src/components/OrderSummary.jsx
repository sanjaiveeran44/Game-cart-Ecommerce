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
            <div className="bg-slate-50 rounded-2xl border border-slate-200/70 p-6 md:p-8 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.35)]">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-700">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                        <span>Shipping</span>
                        <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200 my-4"></div>
                    <div className="flex justify-between text-lg font-bold text-slate-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={loading || Object.keys(cartItems).length === 0}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white text-center transition-all duration-200 flex items-center justify-center gap-2 ${
                        loading || Object.keys(cartItems).length === 0
                            ? 'bg-indigo-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                    }`}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing...
                        </>
                    ) : (
                        'Proceed to Checkout'
                    )}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500 mb-2">We accept</p>
                    <div className="flex justify-center gap-3">
                        <Image src={assets.visa} alt="Visa" width={40} height={25} className="h-6 w-auto" />
                        <Image src={assets.mastercard} alt="Mastercard" width={40} height={25} className="h-6 w-auto" />
                        <Image src={assets.paypal} alt="PayPal" width={40} height={25} className="h-6 w-auto" />
                    </div>
                </div>
            </div>

            <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/70">
                <h3 className="font-semibold text-slate-800 mb-3">Need Help?</h3>
                <p className="text-sm text-slate-600 mb-4">
                    Have questions about your order? Our customer service team is here to help.
                </p>
                <button 
                    onClick={() => router.push('/contact')}
                    className="w-full text-center py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;