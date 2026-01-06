'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

const AddAddress = () => {

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();

    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
                <form onSubmit={onSubmitHandler} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                        Add Shipping Address
                    </h1>
                    <div className="space-y-5">
                        <input
                            className="px-4 py-3 border border-gray-300 rounded-md outline-none w-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 shadow-sm"
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                        />
                        <input
                            className="px-4 py-3 border border-gray-300 rounded-md outline-none w-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 shadow-sm"
                            type="text"
                            placeholder="Phone number"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                        />
                        <input
                            className="px-4 py-3 border border-gray-300 rounded-md outline-none w-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 shadow-sm"
                            type="text"
                            placeholder="Pin code"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            value={address.pincode}
                        />
                        <textarea
                            className="px-4 py-3 border border-gray-300 rounded-md outline-none w-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 shadow-sm resize-none"
                            rows={4}
                            placeholder="Address (Area and Street)"
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            value={address.area}
                        ></textarea>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <input
                                className="px-4 py-3 border border-gray-300 rounded-md outline-none w-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 shadow-sm"
                                type="text"
                                placeholder="City/District/Town"
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                value={address.city}
                            />
                            <input
                                className="px-4 py-3 border border-gray-300 rounded-md outline-none w-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 shadow-sm"
                                type="text"
                                placeholder="State"
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                value={address.state}
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full mt-8 bg-indigo-600 text-white py-3.5 rounded-md font-bold text-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
                        Save Address
                    </button>
                </form>
                <Image
                    className="hidden lg:block w-72 h-auto object-contain ml-12 mt-10"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;