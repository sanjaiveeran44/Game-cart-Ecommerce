"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const router = useRouter();
    const { cartItems, updateCartQuantity, removeFromCart, getCartAmount } = useAppContext();
    const { isSignedIn } = useUser();
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleQuantityChange = (id, change) => {
        const item = cartItems.find(item => item._id === id);
        const newQuantity = (item.quantity || 1) + change;
        
        if (newQuantity < 1) {
            removeFromCart(id);
            toast.success('Item removed from cart');
        } else {
            updateCartQuantity(id, newQuantity);
            toast.success('Cart updated');
        }
    };

    const handlePlaceOrder = () => {
        if (!isSignedIn) {
            toast.error('Please sign in to continue');
            router.push('/sign-in');
            return;
        }

        if (!address.trim()) {
            toast.error('Please enter your delivery address');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success('Order placed successfully!');
            
            router.push('/orders');
        }, 1500);
    };

    const totalAmount = getCartAmount ? getCartAmount() : 0;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                    <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg shadow-sm">
                            <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
                                <p className="text-gray-600 mt-1">${item.offerPrice || item.price}</p>
                                
                                <div className="mt-4 flex items-center space-x-4">
                                    <button
                                        onClick={() => handleQuantityChange(item._id, -1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{item.quantity || 1}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item._id, 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => {
                                            removeFromCart(item._id);
                                            toast.success('Item removed from cart');
                                        }}
                                        className="ml-4 text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">${(item.offerPrice || item.price) * (item.quantity || 1)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${totalAmount}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>${totalAmount}</span>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-200">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Delivery Address
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="Enter your delivery address"
                                />
                            </div>
                            
                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || !address.trim()}
                                className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                                    loading || !address.trim()
                                        ? 'bg-indigo-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                } transition-colors`}
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;