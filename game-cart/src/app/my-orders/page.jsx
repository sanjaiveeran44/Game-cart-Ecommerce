'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const MyOrders = () => {

    const { currency } = useAppContext();
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        console.log('Fetching orders...');
        setOrders(orderDummyData)
        setLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 min-h-screen">
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">My Orders</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-4"></div>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 border-t-transparent border-r-transparent"></div>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto space-y-6">
                        {orders.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="mb-4">
                                    <Image
                                        className="w-24 h-24 mx-auto opacity-50"
                                        src={assets.box_icon}
                                        alt="empty_orders"
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                                <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                                <button
                                    onClick={() => router.push('/')}
                                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            orders.map((order, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                                        <div className="flex flex-1 items-start gap-5">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    className="w-16 h-16 object-contain p-2 bg-slate-50 rounded-md"
                                                    src={assets.box_icon}
                                                    alt="box_icon"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-semibold text-gray-800 text-lg">
                                                    {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                                </p>
                                                <span className="text-gray-600 text-sm">Items: {order.items.length}</span>
                                            </div>
                                        </div>
                                        <div className="text-gray-700 text-sm md:text-right space-y-2">
                                            <p className="font-medium">{order.address.fullName}</p>
                                            <p>{order.address.area}</p>
                                            <p>{`${order.address.city}, ${order.address.state}`}</p>
                                            <p>{order.address.phoneNumber}</p>
                                        </div>
                                        <div className="text-gray-700 text-sm md:text-right">
                                            <p className="font-bold text-lg text-indigo-600 my-auto">{currency}{order.amount.toFixed(2)}</p>
                                            <div className="space-y-1">
                                                <p className="flex items-center gap-2">
                                                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                        ✓
                                                    </span>
                                                    <span>Method: COD</span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                                                        📅
                                                    </span>
                                                    <span>{new Date(order.date).toLocaleDateString()}</span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                                                        ⏳
                                                    </span>
                                                    <span>Payment: Pending</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyOrders;